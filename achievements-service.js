'use strict';

/* global Notification, console */

import { SettingsHelper } from 'fxos-settings-utils/dist/settings-utils';

const DEFAULT_IMAGE_SIZE = 64;

class ImageHelper {
  static getImage(aSrc) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = aSrc;
      image.onload = () => resolve(image);
      image.onerror = reason => reject(reason);
    }).catch(reason => console.warn('Could not load an achievement image:',
      reason));
  }

  /**
   * Generate a Data URL for an image from source.
   * @param  {String} aSrc source path to the image
   * @return {Promise} a promise of Data URL.
   */
  static generateImageDataURL(aSrc) {
    return ImageHelper.getImage(aSrc).then(image => {
      try {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let dataUrl;

        context.drawImage(image, DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SIZE);
        dataUrl = canvas.toDataURL();

        // Clean up.
        canvas.width = canvas.height = 0;
        canvas = null;

        return dataUrl;
      } catch(e) {
        return Promise.reject('Could not convert image to Data URL.');
      }
    }).catch(reason => console.warn(reason));
  }
}

export default class AchievementsService {
  /**
   * Reward an achievement and store a record in 'achievements' setting.
   * @param {JSON} options attributes for the achievement that is awarded:
   *                       {String} criteria    URL of the criteria for earning
   *                                            the achievement
   *                       {String} evidence    A URN of the evidence of
   *                                            achievement unlocked
   *                       {String} name        Achievement name
   *                       {String} description Achievement description
   *                       {String} image       Achievement image
   */
  reward({criteria, evidence, name, description, image}) {
    if (!evidence) {
      return Promise.reject('Evidence is not provided.');
    }

    let issuedOn;
    return SettingsHelper.get('achievements', {}).then(achievements => {
      let achievement = achievements.find(
        achievement => achievement.criteria === criteria);

      if (!achievement) {
        return Promise.reject('Achievement is not registered.');
      }
      if (achievement.evidence) {
        return Promise.reject('Achievement is already awarded.');
      }

      achievement.evidence = evidence;
      achievement.uid = 'achievement' + Math.round(Math.random() * 100000000);
      achievement.issuedOn = issuedOn = Date.now();
      achievement.recipient = {}; // TODO

      return achievements;
    }).then(achievements => Promise.all([
      ImageHelper.generateImageDataURL(image),
      SettingsHelper.set({ 'achievements': achievements })
    ])).then(image => {
      // Send a Notification via WebAPI to be handled by the Gaia::System
      let notification = new Notification(name, {
        body: description,
        icon: image,
        tag: issuedOn
      });

      notification.onclick = () => {
        let activity = new window.MozActivity({
          name: 'configure',
          data: {
            target: 'device',
            section: 'achievements'
          }
        });
        activity.onsuccess = activity.onerror = () => { notification.close(); };
      };
    }).catch(reason => console.warn(reason));
  }
}
