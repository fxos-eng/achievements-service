'use strict';

/* global Notification, console */

import { SettingsHelper } from 'fxos-settings-utils/dist/settings-utils';

class Achievement {
  /**
   * Create an avhievement class.
   * @param {JSON} options    include achievement name, description, criteria,
   *                          and optional image and tags
   * @param {App} app issuing app
   */
  constructor({name, description, criteria, image, tags}, app) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.criteria = criteria;
    this.tags = tags;
    this.issuer = app.url;
  }

  /**
   * Create an instance of an achievement class
   * @param  {String} evidence A URN of the evidence of achievement unlocked
   * @return {Object} achievement instance
   */
  create(evidence) {
    return this.issuer.then(issuer => Object.assign({}, {
      name: this.name,
      description: this.description,
      achievement: this.criteria,
      image: this.image,
      issuer: issuer,
      tags: this.tags,
      uid: 'achievement' + Math.round(Math.random() * 100000000),
      recipient: {}, // TODO
      issuedOn: Date.now(),
      evidence: evidence
    }));
  }
}

class App {
  constructor() {
    this.app = new Promise((resolve, reject) => {
      let request = window.navigator.mozApps.getSelf();
      request.onsuccess = () => { resolve(request.result); };
      request.onerror = () => { reject(request.error); };
    });
  }

  get url() { return this.app.then(app => app.manifestURL); }
}

export default class AchievementsService {
  /**
   * Create a new achievement service
   */
  constructor() {
    this.app = new App();
    this.achievementClasses = {};
  }

  /**
   * Register a new achievement class
   * @param  {JSON} options Achievement class options (see Achievement
   *                        constructor)
   */
  register(options) {
    if (!options.criteria) {
      console.warn('No criteria specified');
      return;
    }

    if (this.achievementClasses[options.criteria]) {
      console.warn('Achievement class is already registered');
      return;
    }

    this.achievementClasses[options.criteria] = new Achievement(options,
      this.app);
  }

  /**
   * Reward an achievement and store a record in 'achievements' setting.
   * @param  {String} criteria URL of the criteria for earning the achievement
   * @param  {String} evidence A URN of the evidence of achievement unlocked
   * @return {Promise} A promise of achievement rewarded
   */
  reward(criteria, evidence) {
    if (!evidence) {
      return Promise.reject('Evidence is not provided');
    }

    let achievementClass = this.achievementClasses[criteria];
    if (!achievementClass) {
      return Promise.reject('Achievement class is not registered');
    }

    let newAchievement, oldAchievements;
    return SettingsHelper.get('achievements', {}).then(achievements => {
      oldAchievements = achievements;
      return criteria in oldAchievements ?
        Promise.reject('Achevement is already rewarded') :
        achievementClass.create(evidence);
    }).then(achievement => {
      newAchievement = achievement;
      oldAchievements[criteria] = newAchievement;
      return oldAchievements;
    }).then(achievements => SettingsHelper.set({ 'achievements': achievements })
    ).then(() => {
      // Send a Notification via WebAPI to be handled by the Gaia::System
      let notification = new Notification(newAchievement.name, {
        body: newAchievement.description,
        icon: newAchievement.image,
        tag: newAchievement.issuedOn
      });

      notification.onclick = () => {
        let activity = new window.MozActivity({
          name: 'configure',
          data: {
            target: 'device',
            section: 'achievement-details',
            options: {
              achievement: newAchievement
            }
          }
        });
        activity.onsuccess = activity.onerror = () => { notification.close(); };
      };
    }).catch(reason => console.warn(reason));
  }
}
