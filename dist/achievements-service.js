define(["exports", "fxos-settings-utils/dist/settings-utils"], function (exports, _fxosSettingsUtilsDistSettingsUtils) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  "use strict";

  var SettingsHelper = _fxosSettingsUtilsDistSettingsUtils.SettingsHelper;
  var Achievement = (function () {
    var Achievement =
    /**
     * Create an avhievement class.
     * @param {JSON} options    include achievement name, description, criteria,
     *                          and optional image and tags
     * @param {App} app issuing app
     */
    function Achievement(_ref, app) {
      var name = _ref.name;
      var description = _ref.description;
      var criteria = _ref.criteria;
      var image = _ref.image;
      var tags = _ref.tags;
      this.name = name;
      this.description = description;
      this.image = image;
      this.criteria = criteria;
      this.tags = tags;
      this.issuer = app.url;
    };

    Achievement.prototype.create = function (evidence) {
      var _this = this;
      return this.issuer.then(function (issuer) {
        return Object.assign({}, {
          name: _this.name,
          description: _this.description,
          achievement: _this.criteria,
          image: _this.image,
          issuer: issuer,
          tags: _this.tags,
          uid: "achievement" + Math.round(Math.random() * 100000000),
          recipient: {}, // TODO
          issuedOn: Date.now(),
          evidence: evidence
        });
      });
    };

    return Achievement;
  })();

  var App = (function () {
    var App = function App() {
      this.app = new Promise(function (resolve, reject) {
        var request = window.navigator.mozApps.getSelf();
        request.onsuccess = function () {
          resolve(request.result);
        };
        request.onerror = function () {
          reject(request.error);
        };
      });
    };

    _classProps(App, null, {
      url: {
        get: function () {
          return this.app.then(function (app) {
            return app.manifestURL;
          });
        }
      }
    });

    return App;
  })();

  var AchievementsService = (function () {
    var AchievementsService =
    /**
     * Create a new achievement service
     */
    function AchievementsService() {
      this.app = new App();
      this.achievementClasses = {};
    };

    AchievementsService.prototype.register = function (options) {
      if (!options.criteria) {
        console.warn("No criteria specified");
        return;
      }

      if (this.achievementClasses[options.criteria]) {
        console.warn("Achievement class is already registered");
        return;
      }

      this.achievementClasses[options.criteria] = new Achievement(options, this.app);
    };

    AchievementsService.prototype.reward = function (criteria, evidence) {
      if (!evidence) {
        return Promise.reject("Evidence is not provided");
      }

      var achievementClass = this.achievementClasses[criteria];
      if (!achievementClass) {
        return Promise.reject("Achievement class is not registered");
      }

      var newAchievement, oldAchievements;
      return SettingsHelper.get("achievements", {}).then(function (achievements) {
        oldAchievements = achievements;
        return criteria in oldAchievements ? Promise.reject("Achevement is already rewarded") : achievementClass.create(evidence);
      }).then(function (achievement) {
        newAchievement = achievement;
        oldAchievements[criteria] = newAchievement;
        return oldAchievements;
      }).then(function (achievements) {
        return SettingsHelper.set({ achievements: achievements });
      }).then(function () {
        // Send a Notification via WebAPI to be handled by the Gaia::System
        var notification = new Notification(newAchievement.name, {
          body: newAchievement.description,
          icon: newAchievement.image,
          tag: newAchievement.issuedOn
        });

        notification.onclick = function () {
          var activity = new window.MozActivity({
            name: "configure",
            data: {
              target: "device",
              section: "achievement-details",
              options: {
                achievement: newAchievement
              }
            }
          });
          activity.onsuccess = activity.onerror = function () {
            notification.close();
          };
        };
      })["catch"](function (reason) {
        return console.warn(reason);
      });
    };

    return AchievementsService;
  })();

  exports["default"] = AchievementsService;
});