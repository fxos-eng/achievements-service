define(["exports", "fxos-settings-utils/dist/settings-utils"], function (exports, _fxosSettingsUtilsDistSettingsUtils) {
  "use strict";

  var SettingsHelper = _fxosSettingsUtilsDistSettingsUtils.SettingsHelper;


  var ICONS = {
    // Default icon for the app
    defaultApp: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAC9CAYAAADm13wwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1Yjc4NjdiNi0yMThmLTQxOTItYTI0Mi04NjYzYTViNDc0YjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUVCNTI5QzRDQUUzMTFFNDgwQjBFMTMxNzg3RDhFMUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUVCNTI5QzNDQUUzMTFFNDgwQjBFMTMxNzg3RDhFMUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MmQwYjRiZi01OGIyLTRjZjQtYWI2NS0xMDk5ZGNiMjg0YTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NWI3ODY3YjYtMjE4Zi00MTkyLWEyNDItODY2M2E1YjQ3NGIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HcGJswAAE0JJREFUeNrsnXl0XFd9x38zGi3WEmsZWZZky5JtKYljy6ZsscnCUkyT0xSSY3KytGFJ2tCW5tBT/sjpIRAglPacnpYDpYXAgRKaDThOWUqTmBJoggkkLch2HNuSbVmrJVn7aksa9febuVa1zMy798280Zv3vp9zvn6WNG+Z3/3OnXvfu/d3QwRSpntguIo39awGJfm5QimstoWsfLVLKSvAWmCNqN9dZE2xBpUuqG0fq511Rra1lWV9iHhqBBACI3Nv4M1uVjNrl9LVrHUZvIxp1uuso0pHWC38YehHCcH0qRo8yJsdrH1K17G2ufiS5ZvgRdZhpeP8QYigJGF6K6OX8+bdrFtY+1mVWfx2BljPs37MepY/AEMoYZj+stE38+Z21m2st7JyPPg251m/Yh1kfYc/AJ0wvT/b5ncqs+/1WRyk8/wy62nWk37sCwR8ZPSgarLcx/oDVi6+6GmW9QPW16Up5Jc+QMAHZpd2+v2sj7Dq4POEdLC+wvqq19v/AQ+bfStvPsb6MKsIntZmkvUN1hfY/Gdg+uwwu9xm/CTrgEc7pZns/H6P9Vk2/2swvTvN3sSbh1h3sYLwbNqQdv6TrM+w+U/B9O4we7XURqwPsELwqGPMsR5jfYLN3wvTrwE9A8MyjuXjrAdZxfBkxpDxQX/P+tuayrLpbHwDwSw1/Ht5c4z1CAyfcQpVn+mEKgfU9A6bvYY3/8S6Fd5zDc+wPsq1fg9Mn16zy3X+MevvKDYsF7iLEdXMfJTNv4DmTeqGlwdKP2F9FYZ3LVIu8mDrv7i8tsD0qRlebj/KePF3wldZwTtYLarc0LwxNLs8Qf0S60PwUdbyLdXWn0BNb234Rt78EobPeuS5yWFVnjB9EsPL5I1fU2waHsh+pBx/rcoVpl9h9gDr0/zf76Oz6slO7velfNVdOJhePVl9nGIPPDB90ZsEVPk+rsrbv6bviY11P0SxWUzA+0g5/0SVu/9Mz2+8XnVYr4cXfIVklXhZlb9/TM9v+Ere/DerCR7wJXJH50XlA++bnt+o9Oh/ztqMsvc1m8QH7IdmT5ue3+CbePMziqW9A0B88ILyhfdMr2r4Z1nlKGuwBPHDc8of3jG9eiong8YqUMYggfFlsFqTJ0yveuk/ZW1A2YIkVCrjNzh9IkcfBvVcGJY01XJbcjvKFGjSxtpXEy4byLqang2fR7HUcTA8MEH88l3ln+wxPV+wfINIwiCMgwd2uFH8o3yUNTX9w6y7UXYgBe5WPnJ/m54/nb9PsaSgGDwGUkXm276X2/c/dG1Nz4aX9ti/wfAgjZXyt9lXja40PV+Y5EORpP/rUVYgjYifDip/ua6m/yJhxhNwhp3KX+4xPX8KZemae1E2wEHuZZ8dcEVHli+klmJpOjCmBjiNLBbRzB3b7jWr6dV91MdgeJAhylXHNrBmpmf+lPAACmQWSSj1Z2vSvOFPm0wCkRUqSlAOZoxNTtP41AwVryug9cXrEBBzJIHUTm7mnLOzcyqLGHwZhjcsqemL1HKqk4bHJxd/V1ZSRLubNvMHIB8B0kfSs0v2alv5dGzV9FzLv49iKZqBJn1DY/Sbkx00Nz+/uubJyaE3XFlHVeVXIFBm3Ma1/TOOm773wkgBb46zGhBz3UpihA1/jiILibNYBwMBNv4Wqgkj15UBZ1k7qsOlM053ZD8Gw+tzYWTC0vCC/F1eJ68H2ogP/9LRmp5r+Y28aSUseaPXhufO6ktHWml2bl57n9xQDl3X3EjFhQUIoH6ntolre+3F30xr+s/B8HrMRyL06ol2I8ML8nrZT/YH2p3aRxxp3nAtL5N270GM9XjtTHf0tqQdZD/ZH2hzj/Jn2mt6ScCJdVo16B8eo3PnB1M6huwvxwFaiC8/lVbT86dIlp5HklXN5klLW2dajiXHMW0e+Zg72KfXpLOmf4iw9LwWJ8710szF2bQcS44jxwPaFfgn02J6/vTIbKgDiKk1Mrwg1WZNvGaOHBdocUD5NeWa/gG05fU4erqLFhbSu4yqHE+OC7Rr+wdSMj1/amQoJxY80+v30NDYpCPHluPK8YEWH+JYhVOp6WXoMO7La9TGTre95fjp/hbxKOLXj9gyPX9a5G/3IYbWdPQNRUdQOokcX84DtPgT9m/IvKYP0H5WfXSgApRQEVqgtq6+jJSknEfOh7hbajPrZjvNG9TyGnT1D9PUzKWMnEvOI+cDWtxnZPrewRFZIeIWxM26Ld/W2ZfRc7Z19KFtr8dN7ONqk5r+DlYe4mZ1x2aUJh1uy69kcuZi9LzAEmnT32li+tsRM2vOdNtPoR4MBtbkvD7jLi3T81dCHW/2Il7JkXmuS+e6alc/OUH6nau20M37mulNV9dHx89n6tw+5I3s50admv4AIQGrJed6zYcbyJTAt+7cRrWVZRTg/1eHS6M/26n123sGUQh63KZj+vcjTsmRkY89A+ZPSHdsraHyK4qW/a6spJB2bq210Z8YwQhMPW5Nanr+KpBhB29BnJLT2TdkPLMpXFpMDTWVcf+2pTpMG8rMMiHI+TvxsEqHN7Ovw8lq+t8jDCHWMr0J0pTZuW1T0tfs2r7JuJkD0+u1Kln7rUwPkjA2OWM81HdLdQWVWEz0LizIo/rqsOG1TGPYsR43xTU9fwXI/9+D+CSnq9+sdpXau3FzldZrt2+qopxg0PB68IRWg/3K36tqeplqhQWOLegZMDNZXVUFFeTlar02Py8U/VYwvR48n7VEfL24YMjiSLQABW5EbJIj98anDacCSuc1YHAHWF5/tntA28hyPaPjU9GcmCAp4u+WlTX92xCX5Jg+/q8sK7Fsy6+kqCCfNhjmtMQEEy32xmveXIu4WJhr0Mxc0rSxw5aNYcPrwlgcDa5dZvrzg6PS06pHXBIjKfpMBpdJJuLqitULLc7PR6IPlS7NzkW38R4wSU2fZzA8Qa5rwmZiKR9Rr3y+2KZvRkySMzAybvR6yTd/mtvm41PT0XHwokts8EiCh1p5uaFoh7cwP4+KC/OpgLeX5vRvR/bz9SH/pSXi80OXTY+lMK1MZZhtbGRiKipdpOYXRe+723jmNMDXtzXBE1+wiPj8UBCmt0bSaA+OujuF9gW+vggml1ixZ2lHdjfikRi5JTg37+4swtJXGDX4ZvFxTb9o+qsQj8QMjmXHQglO5d3xEFdxZzYY5H9koQUscZeE4bEpmN4bSE+/Vmr6esQiMfLEc3B0PCuudXBk3PiJsQ/ZFgoEYPpkhj98tDV6qzEbkOuU631bcyOty89FAcZnM2r6JIb/xZHWjGc7SBW5Xrlu1PgJqRPTVyEO3jA8jK9FpZg+jDh4x/AwviVhMT0e43nM8DC+dU1fgTh4z/AwfkLKxfTlMLw3DQ/jx6VCTJ8Hw3vX8DD+KvLE9CUw/EVfvF8YP0pxEIa/6Kv3DePHBpwVw/AE4/uHEjF9DgwP4/upomfTB+b9shCRjE2B4VcbPza2yDcLUkWkpp/wSyHLsvMw/Grjz/irth9Hslbgy47sOMIAfMSEmP4S4gB8xCUxPZKcAz8xKKbH4kXATwyJ6bE+I/ATA6jpgS+bN+cRB+Aj+sX07YgD8BEdMD3wG52S98Y3pg9gHfSEcfFRbE4HK0tLpE2PdRmBH5CVK7ovj705iXgAH3CCK/nIZdP/FvEAPuCo/BNc+gMAHqcFpgd+48hS0x9BPICvTM+N+z7C/XrgbdqVz5ctnvwy4gI8zKK/l5r+F4gL8DC/jGf6nyMu9igpLIgq28/hcRb9HWrr6o/+p7R43Wu8kR82ePVdBxwy43W7G6PHPnzsNI2Mp39RttKSQtq3cxvJKrEvtbTS+NRM2uPi8VEI4uujq2r6kYlpWSj1OVQI5oaX5e3zWTfsbqK6qvQmga7bWBE9rhxfznM9nw81vjGHwqUliwsBh1b88VnWHyFGZoa/TE5OkN54VT1VV5TS8fYeikTsr+AdDAZoR0MN1YRLl/0+Xxn/RQdqfA/z46U/xDN9ZEVbH2gYfik1laVROQWMb4T4+dCyCmXFCyQzwiuIk33DZ4p8NHV0eYWbNgPJTC98F3Fyt+FhfCOeWdV0TGD6BcTK3YaH8bU5uPIXoTgv6qDYjfx9iJd9w5/u7qf5JR3ZUDBIW2vjL+QYWVig0139y2qaYCBA2zdtMDI+2vir+B9u2rTqmF74Dkxv3/AXZ+foSFvXst/VVpYlNL0YvHtgmIZX3OOXOzeFBXkwvn2eiBvvBC9+ijULwxdEjWTapIn3gKpifVHSfSrWr14QZtjwQReaOsuYYz1pYnoZjfYDGL4xaiRTRiZWm7WoID/pPvFq9PEp86nLMP4iz3HTptfE9MLXYXh7ndZ4Cz/khpKvcpSXu7qlOTVjL6E0jB/la4n+EEqy0/Osc6wtXonCuvw8esuOBsvXcQ1B+bkh2+eRNv1KZufnk+4zOzuvdRwj4+9pogsj41px8RidrP/QM/3y5CcR9Wl5xCuRyGUj125wfoH02bn5OLX/paTJZSZnLsY/TgoJacT4mXi/LuTR8PrihDWG1XCDfyEfrUnlJH1DoxZ/H0OQ0oP49SvJXmBlehmW8E3E0Yyc4Oqw9g+PJWyjSxMk3m1GGXQGjPkm1/IXUjG98EXWPGKpT7xO6cIC0WtnuuO+PtHv83NzEUwzIsqvlKrp2wjjcYwoWhf/9mRX/xB19i1f7ejkuV4aGps0Og5IyEGu5dvSYXpSndkIYqpHWUlhwr/978n2ReO3dvbR8bM9to4D4tbyn9Z5oe59OZlKKE+37kZsrZGnq4FAgJs0q8ftycSSV18/Sy2tHXHv8lxG9o/3lBYk5Gmu5Y/pvNBksshnKPZoF2i06a0Mm8zwsQ9OUdy+AYiL+PJh3RebmP4U6zHEV49U58rWVVUgiPp8W/kz7aYXPkG4b6/Fpg3ltmvqvAw9RPMIE8qX5JTpZQDP3yDO1sgk8e2bqmztK+PoQzmYpqzJ51k9Tppe+EfWWcRaz7zr8s3utcvrt9n8sPgQ8eE/mO5kx/Ty6PCvEG+92r65sc5on+btdajl9fm48qMRyxqdBg+9ZbLtD1m3IO7JqQ2XUkNNJZ3tsV6Yvb46TLUOpg7xGDKK8qCdHVOpUv4CnVo9dm/fTOVXJJ85VVZSRHsMvxV83nn9c7s7p2J6GWv/IOKvEeRggPbu2p5wUkcx/37frm0YYKbPg8p/GTe98M+sF1AG1siklBvecCVVlpUs+708xLpxz5W2Z2n5kBeU72wTkPEf//8Va2usRy3FljXBjWUNZGRCe+8FOj80ShvLr4i24wNY1VkXGbS0h2Izo1ahO2wjHc+5ZVzs/YSRmHq1DPu7oSYcFTDm/kSGz2Tz5jLfY30DZQIc5F+Vz8gtphceYB1D2QAHkFG+H03bjYU0XpjMhLiNNYoyAmlkVPlq0o2mFyRv4D2EBLAgTf1+5adT6TyoE8+7JTPaZ1FeIA08Qg5k2nNqkMfDrMdRZiAFxD+fcuLATplevpY+zPoZyg7Y4CXln4VsMr0gSV5up1g2BQB0aVMd10tOncDpMawytHA/qwtlCTQQn7xH+cYxkuWyTBcy0P9d6iurEuUKklSQv8s64/SJMjVb4ZQy/hDKFsRhWPnjZCZOlskpOkfVVxeMD1Yafj8tWcbeS6YXXmW9k2IrnQAgPniH8gV51fRCC+tGdG7RaWW9XfmBvG56Um236yk2bAH4Dyn3G1gn1uLkazntvp11LcXu6gD/IOW9l9Ywjcxa55qQTq3cpnoKXvAFT6nyHlzLi3BDghVZbOkuig0uwuhMb7KgyvcuVd7kd9NfDspDrPcRxuN7jVFVrg+5pVJzWyotGUb6ZsIMLK9wTJWnqxbidmP+uFbV0fkWPJPVPKbK0XV36NyaNFEyWH2QYiufoLmTXcjaoH/I+gC5NAOe2zOFPsHazfopvJQVSCKmZnL5BKJsSI8r6dvkNpfkLhyHr1z7zSzZCt5FKaTbg+mXI71+SeW2i/UjeMxV/EiVy5cpS245Z1sidKlFJD34rZSBcdcgKWdVOUh5tGfThWdr9v9/Z+0krIG1Vk0Zifs1qhyyjmxe8mKa9TlWE8VSCmK5T2eZU3FuUnGfztY3ssz0gexUL+te1jWsJ1iRQPa+FzcqouK6U8W5163X6oeafiUyJVHu68sts6dZ86icU0KWnZdM1LtVXE965Y15cUUvSfZ5h/oa/hKlMQeiT5hUcWukWAoXzw0J8fIydnJ3RzIpy0JOf83qgJ+T0qHiVKfi5tm7Y35Yu1HG7MsCuw2smyi2It0sPB5lVsXjZhWfz5MPJu6HfFTA0kZ9VklWJ75TfX1fa9gPynbkAdLLqr3+JOu83z7py9acslr20aNsYR1gvZ9iw2CDHv3Av0KxlTzE7Oe8WJC6/oXplyMZ2ParZtB+yu6MbJIx7HnWf6rtgNcLT9e/IQIrjfK4ktT4O1j7KJa5QbZbXd5xP8x6UW2PqxoewPRGTYJjSo+q30lfQJ4DyL3rXUpXswoyeF0zrNcplhFMJHljZElTJNCC6R1BjHVIaSnVrPol2siqWCH57s1TnebSJfuOqM6lpKaWe+SDKyQdzfYl6kUxpMb/CTAAKc6JZ5PDBPUAAAAASUVORK5CYII=",
    // Default icon for the achievement class
    defaultAchievement: ""
  };

  var Achievement = (function () {
    var Achievement =
    /**
     * Create an avhievement class.
     * @param {JSON} options that include:
     *          {String} name Achievement class name
     *          {String} description Achievement class description
     *          {String} criteria URL of the criteria for earning the achievement
     *                            for the given class
     *          {?String} issuer Optional achievement class issuer URL (default is
     *                           app's origin)
     *          {?URL|DataURL} image Optional achievement class image
     *          {?Array} tags An optional list of tags for the Achievement class
     */
    function Achievement(_ref) {
      var name = _ref.name;
      var description = _ref.description;
      var issuer = _ref.issuer;
      var image = _ref.image;
      var criteria = _ref.criteria;
      var tags = _ref.tags;
      this.name = name;
      this.description = description;
      this.image = image || ICONS.defaultAchievement;
      this.issuer = issuer || window.location.origin;
      this.criteria = criteria;
      this.tags = tags;
    };

    Achievement.prototype.create = function (evidence) {
      return {
        name: this.name,
        description: this.description,
        uid: "achievement" + Math.round(Math.random() * 100000000),
        recipient: {}, // TODO
        achievement: this.criteria,
        issuedOn: Date.now(),
        image: this.image,
        evidence: evidence
      };
    };

    return Achievement;
  })();

  var AchievementsService = (function () {
    var AchievementsService =
    /**
     * Create a new achievement service
     */
    function AchievementsService() {
      this.app = new Promise(function (resolve, reject) {
        var request = window.navigator.mozApps.getSelf();
        request.onsuccess = function () {
          resolve(request.result);
        };
        request.onerror = function () {
          reject(request.error);
        };
      });

      this.achievementClasses = {};
    };

    AchievementsService.prototype.register = function (options) {
      if (!options.criteria) {
        console.warn("No criteria specified");
        return;
      }
      this.achievementClasses[options.criteria] = new Achievement(options);
    };

    AchievementsService.prototype.reward = function (criteria, evidence) {
      if (!evidence) {
        console.warn("Evidence is not provided");
        return;
      }

      var achievementClass = this.achievementClasses[criteria];
      if (!achievementClass) {
        console.warn("Achievement class is not registered");
        return;
      }

      var achievement;
      return SettingsHelper.get("achievements", {}).then(function (achievements) {
        if (evidence in achievements) {
          // Reject if achievement is already rewarded.
          return Promise.reject("Achevement is already rewarded");
        } else {
          achievement = achievementClass.create(evidence);
          achievements[evidence] = achievement;
          return Promise.resolve(achievements);
        }
      }).then(function (achievements) {
        // Save new achievement in settings.
        return SettingsHelper.set({ achievements: achievements });
      }).then(function () {
        // Send a Notification via WebAPI to be handled by the Gaia::System
        new Notification(achievement.name, {
          body: achievement.description,
          icon: achievement.image,
          tag: achievement.issuedOn
        });
      })["catch"](function (reason) {
        return console.warn(reason);
      });
    };

    return AchievementsService;
  })();

  exports["default"] = AchievementsService;
});