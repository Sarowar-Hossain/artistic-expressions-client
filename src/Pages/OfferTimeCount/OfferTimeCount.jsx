import React, { useEffect } from "react";
import "./OfferTimeCount.css";
import { TweenMax, Quart } from "gsap";

const OfferTimeCount = () => {
  useEffect(() => {
    const Countdown = {
      $el: null,
      countdown_interval: null,
      total_seconds: 0,
      $: {},

      init: () => {
        Countdown.$el = document.querySelector(".countdown");
        Countdown.$.hours = Countdown.$el.querySelectorAll(
          ".bloc-time.hours .figure"
        );
        Countdown.$.minutes = Countdown.$el.querySelectorAll(
          ".bloc-time.min .figure"
        );
        Countdown.$.seconds = Countdown.$el.querySelectorAll(
          ".bloc-time.sec .figure"
        );

        Countdown.values = {
          hours: parseInt(Countdown.$.hours[0].parentNode.dataset.initValue),
          minutes: parseInt(
            Countdown.$.minutes[0].parentNode.dataset.initValue
          ),
          seconds: parseInt(
            Countdown.$.seconds[0].parentNode.dataset.initValue
          ),
        };

        Countdown.total_seconds =
          Countdown.values.hours * 60 * 60 +
          Countdown.values.minutes * 60 +
          Countdown.values.seconds;

        Countdown.count();
      },

      count: () => {
        const $hour_1 = Countdown.$.hours[0];
        const $hour_2 = Countdown.$.hours[1];
        const $min_1 = Countdown.$.minutes[0];
        const $min_2 = Countdown.$.minutes[1];
        const $sec_1 = Countdown.$.seconds[0];
        const $sec_2 = Countdown.$.seconds[1];

        Countdown.countdown_interval = setInterval(() => {
          if (Countdown.total_seconds > 0) {
            --Countdown.values.seconds;

            if (Countdown.values.minutes >= 0 && Countdown.values.seconds < 0) {
              Countdown.values.seconds = 59;
              --Countdown.values.minutes;
            }

            if (Countdown.values.hours >= 0 && Countdown.values.minutes < 0) {
              Countdown.values.minutes = 59;
              --Countdown.values.hours;
            }

            Countdown.checkHour(Countdown.values.hours, $hour_1, $hour_2);
            Countdown.checkHour(Countdown.values.minutes, $min_1, $min_2);
            Countdown.checkHour(Countdown.values.seconds, $sec_1, $sec_2);

            --Countdown.total_seconds;
          } else {
            clearInterval(Countdown.countdown_interval);
          }
        }, 1000);
      },

      animateFigure: ($el, value) => {
        const $top = $el.querySelector(".top");
        const $bottom = $el.querySelector(".bottom");
        const $back_top = $el.querySelector(".top-back");
        const $back_bottom = $el.querySelector(".bottom-back");

        $back_top.querySelector("span").textContent = value;
        $back_bottom.querySelector("span").textContent = value;

        TweenMax.to($top, 0.8, {
          rotationX: "-180deg",
          transformPerspective: 300,
          ease: Quart.easeOut,
          onComplete: () => {
            $top.textContent = value;
            $bottom.textContent = value;
            TweenMax.set($top, { rotationX: 0 });
          },
        });

        TweenMax.to($back_top, 0.8, {
          rotationX: 0,
          transformPerspective: 300,
          ease: Quart.easeOut,
          clearProps: "all",
        });
      },

      checkHour: (value, $el_1, $el_2) => {
        const val_1 = value.toString().charAt(0);
        const val_2 = value.toString().charAt(1);
        const fig_1_value = $el_1.querySelector(".top").textContent;
        const fig_2_value = $el_2.querySelector(".top").textContent;

        if (value >= 10) {
          if (fig_1_value !== val_1) Countdown.animateFigure($el_1, val_1);
          if (fig_2_value !== val_2) Countdown.animateFigure($el_2, val_2);
        } else {
          if (fig_1_value !== "0") Countdown.animateFigure($el_1, "0");
          if (fig_2_value !== val_1) Countdown.animateFigure($el_2, val_1);
        }
      },
    };

    Countdown.init();
  }, []);

  return (
    <div className="wrap">
      <h1>
        Draft <strong>Countdown</strong>
      </h1>

      <div className="countdown">
        <div className="bloc-time hours" data-init-value="24">
          <span className="count-title">Hours</span>

          <div className="figure hours hours-1">
            <span className="top">2</span>
            <span className="top-back">
              <span>2</span>
            </span>
            <span className="bottom">2</span>
            <span className="bottom-back">
              <span>2</span>
            </span>
          </div>

          <div className="figure hours hours-2">
            <span className="top">4</span>
            <span className="top-back">
              <span>4</span>
            </span>
            <span className="bottom">4</span>
            <span className="bottom-back">
              <span>4</span>
            </span>
          </div>
        </div>

        <div className="bloc-time min" data-init-value="0">
          <span className="count-title">Minutes</span>

          <div className="figure min min-1">
            <span className="top">0</span>
            <span className="top-back">
              <span>0</span>
            </span>
            <span className="bottom">0</span>
            <span className="bottom-back">
              <span>0</span>
            </span>
          </div>

          <div className="figure min min-2">
            <span className="top">0</span>
            <span className="top-back">
              <span>0</span>
            </span>
            <span className="bottom">0</span>
            <span className="bottom-back">
              <span>0</span>
            </span>
          </div>
        </div>

        <div className="bloc-time sec" data-init-value="0">
          <span className="count-title">Seconds</span>

          <div className="figure sec sec-1">
            <span className="top">0</span>
            <span className="top-back">
              <span>0</span>
            </span>
            <span className="bottom">0</span>
            <span className="bottom-back">
              <span>0</span>
            </span>
          </div>

          <div className="figure sec sec-2">
            <span className="top">0</span>
            <span className="top-back">
              <span>0</span>
            </span>
            <span className="bottom">0</span>
            <span className="bottom-back">
              <span>0</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferTimeCount;
