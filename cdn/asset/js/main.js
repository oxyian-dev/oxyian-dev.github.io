const texts = [
    "yourcompanyname.com",
    "nametomato.com",
    "rocket.app",
    "aditi.me",
    "firstrooster.com",
    "bobthebuilder.in",
    "mobileshop.online",
    "xyzjs.io",
  ],
  input = document.querySelector("#oxyian-searchbox"),
  animationWorker = function (t, i) {
    (this.input = t),
      (this.defaultPlaceholder = this.input.getAttribute("placeholder")),
      (this.texts = i),
      (this.curTextNum = 0),
      (this.curPlaceholder = ""),
      (this.blinkCounter = 0),
      (this.animationFrameId = 0),
      (this.animationActive = !1),
      this.input.setAttribute("placeholder", this.curPlaceholder),
      (this.switch = (t) => {
        this.input.classList.add("imitatefocus"),
          setTimeout(() => {
            this.input.classList.remove("imitatefocus"),
              0 == this.curTextNum
                ? this.input.setAttribute(
                    "placeholder",
                    this.defaultPlaceholder
                  )
                : this.input.setAttribute("placeholder", this.curPlaceholder),
              setTimeout(() => {
                this.input.setAttribute("placeholder", this.curPlaceholder),
                  this.animationActive &&
                    (this.animationFrameId = window.requestAnimationFrame(
                      this.animate
                    ));
              }, t);
          }, t);
      }),
      (this.animate = () => {
        if (!this.animationActive) return;
        let t = this.texts[this.curTextNum],
          i = 900;
        if (this.curPlaceholder == t + "|" && 3 == this.blinkCounter)
          return (
            (this.blinkCounter = 0),
            (this.curTextNum =
              this.curTextNum >= this.texts.length - 1
                ? 0
                : this.curTextNum + 1),
            (this.curPlaceholder = "|"),
            void this.switch(3e3)
          );
        this.curPlaceholder == t + "|" && this.blinkCounter < 3
          ? ((this.curPlaceholder = t), this.blinkCounter++)
          : this.curPlaceholder == t && this.blinkCounter < 3
          ? (this.curPlaceholder = this.curPlaceholder + "|")
          : ((this.curPlaceholder =
              t
                .split("")
                .slice(0, this.curPlaceholder.length + 1)
                .join("") + "|"),
            (i = 150)),
          this.input.setAttribute("placeholder", this.curPlaceholder),
          setTimeout(() => {
            this.animationActive &&
              (this.animationFrameId = window.requestAnimationFrame(
                this.animate
              ));
          }, i);
      }),
      (this.stop = () => {
        (this.animationActive = !1),
          window.cancelAnimationFrame(this.animationFrameId);
      }),
      (this.start = () => (
        (this.animationActive = !0),
        (this.animationFrameId = window.requestAnimationFrame(this.animate)),
        this
      ));
  };
document.addEventListener("DOMContentLoaded", () => {
  let t = new animationWorker(input, texts).start();
  input.addEventListener("focus", (i) => t.stop()),
    input.addEventListener("blur", (i) => {
      (t = new animationWorker(input, texts)),
        "" == i.target.value && setTimeout(t.start, 2e3);
    });
});
console.log(
  "%c Looking for a Job? Send your resume to this email job@oxyian.com ",
  "background: #222; color: #bada55"
);

var span = document.querySelector(".oxyian-typewriter span");
var textArr = span.getAttribute("data-text").split(", ");
var maxTextIndex = textArr.length;



var sPerChar = 0.15;
var sBetweenWord = 1.5;
var textIndex = 0;

typing(textIndex, textArr[textIndex]);
function typing(textIndex, text) {
  var charIndex = 0;
  var maxCharIndex = text.length - 1;

  var typeInterval = setInterval(function () {
    span.innerHTML += text[charIndex];
    if (charIndex == maxCharIndex) {
      clearInterval(typeInterval);
      setTimeout(function () {
        deleting(textIndex, text);
      }, sBetweenWord * 7000);
    } else {
      charIndex += 1;
    }
  }, sPerChar * 1000);
}

function deleting(textIndex, text) {
  var minCharIndex = 0;
  var charIndex = text.length - 1;

  var typeInterval = setInterval(function () {
    span.innerHTML = text.substr(0, charIndex);
    if (charIndex == minCharIndex) {
      clearInterval(typeInterval);
      textIndex + 1 == maxTextIndex ? (textIndex = 0) : (textIndex += 1);
      setTimeout(function () {
        typing(textIndex, textArr[textIndex]);
      }, sBetweenWord * 500);
    } else {
      charIndex -= 1;
    }
  }, sPerChar * 500);
}
