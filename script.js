const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// gsap.registerPlugin(ScrollTrigger);

function videoConAnimation() {
    var videocon = document.querySelector("#video-container")
    var playbtn = document.querySelector("#play")
    

    videocon.addEventListener("mouseenter", function() {
        gsap.to(playbtn, {
            scale: 1,
            opacity: 0.7
        })
    })

    videocon.addEventListener("mouseleave", function() {
        gsap.to(playbtn, {
            scale: 0,
            opacity: 0
        })
    });

    videocon.addEventListener("mousemove", function(attr) {
        var rect = videocon.getBoundingClientRect();
        var relativeX = attr.clientX - rect.left;
        var relativeY = attr.clientY - rect.top;

        var playBtnRect = playbtn.getBoundingClientRect();
        var offsetX = playBtnRect.width / 2; // Half of button width
        var offsetY = playBtnRect.height / 2;

        gsap.to(playbtn, {
            left: (relativeX-offsetX) + "px",
            top: (relativeY-offsetY) + "px"
        });
    })
}

function landingTextAnimation() {
    gsap.from("#page1 h1" , {
        y: 100,
        opacity:0,
        delay:0.5,
        duration : 0.5,
        stagger: 0.2
    });
    gsap.from("#page1 #video-container" , {
        scale: 0.95,
        opacity:0,
        delay:1,
        duration : 1,
    });
    
}

function cursorAnimation() {        
    gsap.set("#cursor", {
        scale: 0,
        transform: 'translate(-50%, -50%)'
    });

    document.addEventListener("mousemove", function(dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
            duration: 0.3
        });
    })

    document.querySelectorAll(".prodCards").forEach(card => {
        card.addEventListener("mouseenter", function () {
            document.querySelector("#cursor").classList.add("active");
            gsap.to("#cursor", {
                scale: 1,
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.4
            });
        });

        card.addEventListener("mouseleave", function () {
            document.querySelector("#cursor").classList.remove("active");
            gsap.to("#cursor", {
                scale: 0,
                transform: 'translate(-50%, -50%)'
            });
        });
    });

}

function locomotiveAnimation() {
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    scroll.on("scroll", ScrollTrigger.update);
    gsap.registerPlugin(ScrollTrigger);
  
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    gsap.to("#nav-part1 #logo1", {
        opacity: 0,
        y: "-100%",
        scrollTrigger: {
            trigger: "#page1",     
            scroller: "#main",     
            start: "top 0%",       
            end: "top -5%",        
            scrub: true            
        },
        duration: 1.5,
        delay: 1
    });

    gsap.from("#nav-part1 #logo2", {
        opacity: 0,
        y: "100%",
        scrollTrigger: {
            trigger: "#page1",         
            scroller: "#main",         
            start: "top 0%",           
            end: "top -5%",            
            scrub: true             
        },
        duration: 1.5,
        delay: 1
    });

    gsap.to("#nav-part2 #links", {
        opacity: 0,
        y: "-100%",
        scrollTrigger: {
            trigger: "#page1",         
            scroller: "#main",         
            start: "top 0%",           
            end: "top -5%",            
            scrub: true             
        },
        duration: 1.5,
        delay: 1
    })
    
    // Optional: If you're using `data-scroll` and `data-scroll-speed` for other elements
    document.querySelectorAll('[data-scroll]').forEach((el) => {
        locoScroll.update();
    });
}

// const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#page1",
//       scroller: "#main",
//       start: "top 0%",
//       end: "top -5%",
//       scrub: true,
//       markers: true, // Debug markers
//     },
//   });
  
//   tl.to("#nav-part1 #logo1", {
//     opacity: 0,
//     // backgroundColor: "red",
//     y: -50, // Moves the first logo up
//   })
//     .to("#nav-part1 #logo2", {
//       opacity: 1,
//       y: 0, // Moves the second logo up (matches the first logo)
//     //   backgroundColor: "red"
//     }, "<"); // The "<" ensures it happens simultaneously with the first animation
// console.log(document.querySelector("#nav-part1 #logo1"));
// console.log(document.querySelector("#page1"));

landingTextAnimation()
videoConAnimation()
cursorAnimation()
locomotiveAnimation()
