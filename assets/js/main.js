var vid = document.getElementById("video");
var pp = document.getElementById("pp");
var stop = document.getElementById("stop");
var fscr = document.getElementById("fscr");
var seekplus = document.getElementById("seekplus");
var seekback = document.getElementById("seekback");
var tchange = document.getElementById("tchange");
var range = document.getElementById("range");
var vchange = document.getElementById("vchange");
var volume = document.getElementById("volume");
var ctime = document.getElementById("ctime");
var ttime = document.getElementById("ttime");
var playBtn = document.getElementById("play");
var pauseBtn = document.getElementById("pause");
var sound = document.getElementById("sound");
var is = document.querySelectorAll("#sound i");
var cont = document.querySelector(".cont");
var overlay = document.querySelector(".over");

vid.controls = false;
var dur = vid.duration;
vchange.style.width = vid.volume * 100 + "%";
volume.value = vid.volume * 100;
var isFirst = 0;
var prev = 0;

function firstTime() {
    isFirst++;
    var dur = Math.floor(vid.duration);
    var totalDur = dur / 60 + ":" + "0" + dur % 60;
    ttime.innerText = totalDur;
    ctime.innerText = "0:00";
    document.querySelector("p.hide").classList.remove("hide");
    cont.addEventListener("mouseenter", function() {
        overlay.style.display = "block";
    })
    cont.addEventListener("mouseleave", function() {
        if (vid.paused || vid.ended) return;
        overlay.style.display = "none";
    })
}

pp.addEventListener("click", function () {
    if (vid.paused || vid.currentState == 0 || vid.ended) {
        vid.play();
        if (isFirst == 0) {
            firstTime();
        }
        pauseBtn.classList.remove("hide");
        playBtn.classList.add("hide");
    } else {
        vid.pause();
        playBtn.classList.remove("hide");
        pauseBtn.classList.add("hide");
    }
});

stop.addEventListener("click", function () {
    vid.pause();
    vid.currentTime = 0;
});

fscr.addEventListener("click", function () {
    if (vid.requestFullscreen) {
        vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
    } else if (vid.msRequestFullscreen) {
        vid.msRequestFullscreen();
    }
});

seekplus.addEventListener("click", function () {
    vid.currentTime += 5;
});

seekback.addEventListener("click", function () {
    vid.currentTime -= 5;
});
vid.addEventListener("timeupdate", function () {
    var val = Math.floor(100 / vid.duration * vid.currentTime);
    tchange.style.width = val + "%";
    range.value = val;
    var time = 0 + ":";
    if ((Math.floor(vid.currentTime) / 60) > 1) {
        time = 1 + ":";
    }
    if ((Math.floor(vid.currentTime) % 60) > 9) {
        time += Math.floor(vid.currentTime) % 60;
    } else {
        time += "0" + Math.floor(vid.currentTime) % 60;
    }
    ctime.innerHTML = time;
    if (vid.currentTime == vid.duration) {
        vid.currentTime = 0;
    }
    if (vid.currentTime == 0) {
        pauseBtn.classList.add("hide");
        playBtn.classList.remove("hide");
    }
});
range.addEventListener("input", function () {
    vid.currentTime = vid.duration * (range.value / 100);
});
volume.addEventListener("input", function () {
    vchange.style.width = this.value + "%";
    vid.volume = this.value / 100;
    if (this.value == 0) {
        disp(0);
    } else if (this.value > 0 && this.value < 71) {
        disp(1);
    } else if (this.value > 70) {
        disp(2);
    }
});
sound.addEventListener("click", function () {
    if (!vid.muted) {
        vid.muted = true;
        vchange.style.width = 0 + "%";
        prev = vid.volume * 100;
        volume.value = 0;
        disp(0);
    } else {
        vid.muted = false;
        vid.volume = prev / 100;
        volume.value = prev;
        vchange.style.width = prev + "%";
        if (prev > 0 && prev < 71) {
            disp(1);
        } else if (prev > 70) {
            disp(2);
        }
    }
});

function disp(pos) {
    for (let i = 0; i < is.length; i++) {
        if (i == pos) {
            is[i].style.setProperty("display", "inline-block", "important");
        } else {
            is[i].style.setProperty("display", "none", "important");
        }
    }
}