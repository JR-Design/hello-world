//INTRO ANIMATION JAZZ
var intro = gsap.timeline({ defaults: { ease: "power1.InOut" } });

intro.to("nav", {translateY: -200}, "-=2.5");
intro.to(".highlight", {scaleX: 0}, "-=2.5");
intro.to("#portraitTrim", {scaleY: 0, scaleX: 0}, "-=2.5");


intro.to(".socialMedia > div > a > img", {scaleY: 1, translateX: "-100vw"}, "-=2.5");
intro.to("#colorSelector", {scaleY: 1, translateX: -1000}, "-=2.5");
intro.to("#portrait", { translateX: "-100vw"}, "-=2.5");
intro.to(".pages", {translateX: "0vw"});

intro.to(".text", { y: "0%", duration: 0.5, stagger: 0.25 },"-=.5");
intro.to(".hide2 span", {y:"-130%", duration:0, delay: 0 });
intro.to(".slider2", { y: "-100%", duration: 1.1, delay: 0.25 },"+=0.5");
intro.to(".intro", { y: "-100%", duration: 0.5 }, "-=.75");
intro.fromTo("main", { opacity: 0}, { opacity: 1, duration: 0.5 }, "-=0.5");

intro.to(".SudburyON", {color: "var(--font-color-inverse)"} );


intro.to("nav", {scaleY: 1, translateY: 0, duration: 1, delay: 0.5, }, "-=1.25");
intro.to(".hide2 span", {y:"0%", duration:0.35, delay: 0, stagger: 0.15 }, "-=0.75");
intro.to(".hide2", {background: "none", duration:0.1}, "-=0.5");

intro.to(".highlight", {scaleX: 1, duration: 0.25, delay: 0, transformOrigin: "bottom left"}, "-=1");
intro.to("#portrait", {translateX: 0, duration: 0.65, delay: 0.25, }, "-=.85");
intro.to("#portraitTrim", {scaleY: 1, scaleX: 1, duration: 0.65,  }, "-=1.55");

intro.to(".socialMedia > div > a > img", {scaleY: 1, translateX: 0, duration: 0.75, stagger: 0.05 }, "-=0.5");
intro.to("#colorSelector", {scaleY: 1, translateX: 0, duration: 0.5, delay: 0, stagger: 0.25 },"-=0.55");





//GSDevTools.create();
