/**
* Template Name: Squadfree
* Template URL: https://bootstrapmade.com/squadfree-free-bootstrap-template-creative/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('clients-carousel');

  const newImageUrls = IMAGE_PATHS.CLIENTS_LOGOS;

  // إضافة الصور
  newImageUrls.forEach((url, index) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Client Image ${index + 1}`;
    carousel.appendChild(img);
  });

  // تحديد اتجاه الصفحة
  const isRTL = document.documentElement.dir === 'rtl';

  // تهيئة Glider
  const glider = new Glider(carousel, {
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    rtl: isRTL,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        }
      },
    ],
  });

  if (isRTL) {
    document.getElementById('glider-prev').addEventListener('click', () => glider.scrollItem('next'));
    document.getElementById('glider-next').addEventListener('click', () => glider.scrollItem('prev'));
  } else {
    document.getElementById('glider-prev').addEventListener('click', () => glider.scrollItem('prev'));
    document.getElementById('glider-next').addEventListener('click', () => glider.scrollItem('next'));
  }
});


// document.addEventListener("DOMContentLoaded", function () {
//   const video = document.querySelector("#hero video");

//   // نحاول نشغّل الفيديو أول ما الصفحة تفتح
//   const tryPlay = () => {
//     if (video) {
//       video.play().catch((error) => {
//         console.log("Autoplay issue:", error);
//         // ممكن تضيف زرار "تشغيل الفيديو" لو حبيت
//       });
//     }
//   };

//   // تشغيل الفيديو أول ما الصفحة تجهز
//   tryPlay();

//   // إعادة التشغيل لما المستخدم يرجع للتاب
//   document.addEventListener("visibilitychange", function () {
//     if (document.visibilityState === "visible") {
//       tryPlay();
//     }
//   });

//   // لو المتصفح وقف الفيديو بعد فترة (موبايلات أحيانًا تعمل كده)
//   video.addEventListener("pause", function () {
//     if (document.visibilityState === "visible") {
//       tryPlay();
//     }
//   });
// });

// ***********************************************************

document.addEventListener("DOMContentLoaded", function () {
  const languageButton = document.getElementById("languageButton");

  const elementsToTranslate = {
    // Navigation
    "homeNav": { en: "Home", ar: "الرئيسية" },
    "homeNav2": { en: "Home", ar: "الرئيسية" },
    "aboutNav": { en: "About", ar: "عن الشركة" },
    "aboutNav2": { en: "About", ar: "عن الشركة" },
    "servicesNav": { en: "Services", ar: "خدماتنا" },
    "servicesNav2": { en: "Services", ar: "خدماتنا" },
    "awardsNav": { en: "Awards", ar: "الجوائز" },
    "awardsNav2": { en: "Awards", ar: "الجوائز" },
    "contactNav": { en: "Contact", ar: "تواصل معنا" },
    "contactNav2": { en: "Contact", ar: "تواصل معنا" },
    "ourBusinessNav": { en: "Our business", ar: "أعمالنا" },
    "languageButton": { en: "عربي", ar: "English" },
    // Sanad Video
    "sanadTitle": {
      en: "Sanad - Award Distribution Ceremony",
      ar: "حفل توزيع جوائز سند"
    },
    "sanadDescription": {
      en: "A highlight reel of the Sanad Award Distribution Ceremony, celebrating achievements and recognizing excellence.",
      ar: "ملخص لأبرز لحظات حفل توزيع جوائز سند، احتفالاً بالإنجازات وتكريماً للتميز."
    },
    // Riyadh Valley Main Film
    "riyadhValleyTitle": {
      en: "Riyadh Valley Main Film",
      ar: "الفيلم الرئيسي لوادي الرياض"
    },
    "riyadhValleyDescription": {
      en: "Explore the vision and development of Riyadh Valley through its main introductory film, showcasing its impact and future.",
      ar: "اكتشف رؤية وتطور وادي الرياض من خلال فيلمه التعريفي الرئيسي، الذي يسلط الضوء على تأثيره ومستقبله."
    },
    // Specific Project: Ras Al Khair
    "projectRasAlKhairTitle": {
      en: "Ras Al Khair",
      ar: "رأس الخير" // Or your preferred Arabic translation for "Ras Al Khair"
    },
    "projectRasAlKhairDescription": {
      en: "A comprehensive showreel highlighting key projects and milestones across our company's timeline.",
      ar: "عرض شامل لأبرز المشاريع والإنجازات على مدار تاريخ شركتنا."
    },
    // Tadawul Infographics
    "tadawulInfographicsTitle": {
      en: "Tadawul Infographics",
      ar: "إنفوجرافيك تداول"
    },
    "tadawulInfographicsDescription": {
      en: "Dynamic infographics illustrating key data and trends from the Saudi Exchange (Tadawul).",
      ar: "إنفوجرافيك ديناميكي يوضح البيانات والاتجاهات الرئيسية من السوق المالية السعودية (تداول)."
    },

    "swissCornerTitle": {
      en: "Swiss Corner - Mother Day",
      ar: "سويس كورنر - عيد الأم"
    },
    "swissCornerDescription": {
      en: "A special film by Swiss Corner dedicated to Mother's Day, capturing heartwarming moments.",
      ar: "فيلم خاص من سويس كورنر بمناسبة عيد الأم، يجسد لحظات مؤثرة ودافئة."
    },
    // Acwa Power
    "acwaPowerTitle": {
      en: "ACWA Power Film",
      ar: "فيلم أكوا باور"
    },
    "acwaPowerDescription": {
      en: "A corporate film showcasing ACWA Power's commitment to sustainable energy solutions and its global impact.",
      ar: "فيلم تعريفي لشركة أكوا باور، يعرض التزامها بحلول الطاقة المستدامة وتأثيرها العالمي."
    },
    // Madina
    "madinaTitle": {
      en: "Madina Development Film",
      ar: "فيلم تطوير المدينة المنورة"
    },
    "madinaDescription": {
      en: "A film showcasing the ongoing development and future vision for the holy city of Madina.",
      ar: "فيلم يعرض التطورات الجارية والرؤية المستقبلية للمدينة المنورة."
    },
    // Monsha'at
    "monshaatTitle": {
      en: "Monsha'at Overview Film",
      ar: "فيلم تعريفي بمنشآت"
    },
    "monshaatDescription": {
      en: "An informative film about Monsha'at, the General Authority for Small and Medium Enterprises, highlighting its role in supporting entrepreneurship.",
      ar: "فيلم توضيحي حول هيئة المنشآت الصغيرة والمتوسطة (منشآت)، ودورها في دعم ريادة الأعمال."
    },
    // Alandalus Property
    "alandalusPropertyTitle": {
      en: "Alandalus Property Film",
      ar: "فيلم الأندلس العقارية"
    },
    "alandalusPropertyDescription": {
      en: "A corporate film showcasing Alandalus Property's real estate projects and its contribution to urban development.",
      ar: "فيلم تعريفي يعرض مشاريع الأندلس العقارية ومساهمتها في التنمية العمرانية."
    },
    // Portfolio Section
    "portfolioTitle": { en: "Our Business", ar: "أعمالنا" },
    "portfolioDescription": { en: "Explore our diverse portfolio of work, showcasing both captivating videos and stunning images.", ar: "استكشف مجموعتنا المتنوعة من الأعمال، التي تعرض مقاطع فيديو آسرة وصورًا مذهلة." },

    // Hero Section
    "heroTitle": { en: "Explore Our Journey", ar: "اكتشف رحلتنا" },
    "heroDescription": { en: "Follow the milestones that shaped our path in audio-visual production, events, and creative storytelling.", ar: "تابع معنا المحطات المهمة التي شكلت مسيرتنا في الإنتاج الإعلامي والفعاليات وفن السرد الإبداعي." },
    //  Dropdown Menu

    "productionMenuLink": { en: "Production", ar: "الإنتاج" },
    "eventManagementMenuLink": { en: "Event Management", ar: "إدارة الفعاليات" },
    "timeLapseMenuLink": { en: "Time Lapse", ar: "تايم لابس" },
    // Who We Are Section
    "whoWeAreTitle": { en: "Who", ar: "من" },
    "whoWeAreTitleBold": { en: "We Are?", ar: "نحن؟" },
    "aboutText1": { en: "Established in 2010, TIMELINE Production and Events Company has emerged as a premier media production and event management firm based in Riyadh, Saudi Arabia.", ar: "منذ تأسيسها عام 2010، ترسخت مكانة شركة تايم لاين للإنتاج والفعاليات كواحدة من الشركات الرائدة في مجال الإنتاج الإعلامي وتنظيم الفعاليات في الرياض بالمملكة العربية السعودية." },
    "aboutText2": { en: "Our journey began with a vision to revolutionize the media and event industries through innovative solutions and unparalleled services.", ar: "انطلقت رحلتنا من رؤية طموحة لنقل صناعتي الإعلام والفعاليات إلى آفاق جديدة من خلال الحلول المبتكرة والخدمات المتميزة." },
    "aboutText3": { en: "Over the past 15 years, we have consistently delivered exceptional results, earning a reputation for excellence and reliability.", ar: "خلال الخمسة عشر عاماً الماضية، حققنا إنجازات استثنائية بصورة مستمرة، مما أكسبنا سمعة راسخة في التميز والموثوقية." },
    "ourMissionTitle": { en: "Our Mission", ar: "رسالتنا" },
    "ourMissionText": { en: "Excellence in providing services using the latest equipment with creative minds that understand the needs of our partners and meet their aspirations and give them the best quality and originality.", ar: "نسعى للتميز في تقديم خدماتنا بأحدث التقنيات وأكثرها تطوراً، مدفوعين بفرق إبداعية تتفهم احتياجات شركائنا وتلبي تطلعاتهم، لنقدم لهم أعلى معايير الجودة والأصالة." },
    "ourVisionTitle": { en: "Our Vision", ar: "رؤيتنا" },
    "ourVisionText": { en: "To be the best and most reliable production choice in the Kingdom of Saudi Arabia.", ar: "أن نكون الخيار الأول والأكثر ثقة في مجال الإنتاج الإعلامي بالمملكة العربية السعودية." },

    // Our Services Section
    "ourServicesProductionTitle": { en: "OUR SERVICES PRODUCTION", ar: "خدماتنا الإنتاجية" },
    "commercialProductionTitle": { en: "Commercial Production", ar: "الإنتاج الإعلاني" },
    "commercialProductionText": { en: "The company specializes in creating TVc and smc for businesses and brands. This service includes concept development, scriptwriting, filming, editing, and delivering high-quality commercials for television broadcast.", ar: "نتخصص في إنتاج الإعلانات التلفزيونية والرقمية للشركات والعلامات التجارية. تشمل خدماتنا تطوير الفكرة الإبداعية وكتابة السيناريو والتصوير والمونتاج وتسليم إعلانات احترافية جاهزة للبث." },
    "photographyTitle": { en: "Photography", ar: "التصوير الفوتوغرافي" },
    "photographyText": { en: "Our skilled photographers capture stunning images that tell a story, whether it's for events, products, or personal projects.", ar: "يقوم مصورونا المحترفون بالتقاط صور رائعة تحكي قصصاً مؤثرة، سواء للفعاليات أو المنتجات أو المشاريع الشخصية." },
    "postProductionTitle": { en: "Post Production", ar: "مرحلة ما بعد الإنتاج" },
    "postProductionText": { en: "Our post-production services include editing and refining footage, sound design, color correction, and visual effects to create the final product.", ar: "تشمل خدمات ما بعد الإنتاج المونتاج وتحسين المشاهد، وتصميم الصوت وتدرج الألوان والمؤثرات البصرية لإخراج العمل في صورته النهائية." },
    "motionGraphicsTitle": { en: "Motion Graphics 2D & 3D", ar: "الرسوم المتحركة ثنائية وثلاثية الأبعاد" },
    "motionGraphicsText": { en: "The company specializes in creating both 2D and 3D motion graphics, including animated graphics, visual effects, and dynamic visuals to enhance video content.", ar: "نبدع في تصميم الرسوم المتحركة ثنائية وثلاثية الأبعاد، بما يشمل الرسوم المتحركة والمؤثرات البصرية والعناصر الديناميكية لإثراء المحتوى المرئي." },
    "documentaryTitle": { en: "Documentary", ar: "الأفلام الوثائقية" },
    "documentaryText": { en: "Timeline excels in producing documentaries that tell compelling stories. This service includes researching, filming interviews, editing, and creating the final documentary product.", ar: "نتميز في إنتاج الأفلام الوثائقية التي تروي قصصاً مؤثرة ومقنعة. تشمل خدماتنا البحث والتقصي وتصوير المقابلات والمونتاج وإخراج العمل الوثائقي المكتمل." },
    "corporateFilmProductionTitle": { en: "Corporate Film Production", ar: "إنتاج الأفلام المؤسسية" },
    "corporateFilmProductionText": { en: "From concept to completion, we produce high-quality videos for commercials, corporate presentations, documentaries, and more.", ar: "من الفكرة حتى التنفيذ، ننتج أفلاماً عالية الجودة للإعلانات والعروض المؤسسية والأفلام الوثائقية وغيرها الكثير." },
    "broadcastServicesTitle": { en: "Broadcast Services", ar: "خدمات البث الإذاعي والتلفزيوني" },
    "broadcastServicesText": { en: "Broadcast services involve the transmission of audio and video content to a dispersed audience via television, radio, or online streaming platforms, ensuring seamless, high-quality content delivery.", ar: "نقدم خدمات البث الشاملة لنقل المحتوى الصوتي والمرئي للجمهور عبر التلفزيون والإذاعة ومنصات البث الرقمي، مع ضمان تقديم محتوى عالي الجودة بسلاسة تامة." },
    "ivrRecordingTitle": { en: "IVR Recording", ar: "تسجيل الردود الآلية" },
    "ivrRecordingText": { en: "We provide professional IVR (Interactive Voice Response) recording services for businesses to create efficient, automated phone systems and voice prompts.", ar: "نوفر خدمات تسجيل الردود الآلية التفاعلية بجودة احترافية للشركات لإنشاء أنظمة هاتفية ذكية وفعالة مع إرشادات صوتية واضحة." },
    "logisticsServicesTitle": { en: "Logistics Services", ar: "الخدمات اللوجستية" },
    "logisticsServicesText": { en: "Our logistics services include planning, coordination, and management of all physical and technical aspects required for producing high-quality media content.", ar: "تشمل خدماتنا اللوجستية التخطيط والتنسيق وإدارة جميع الجوانب المادية والتقنية اللازمة لإنتاج محتوى إعلامي متميز." },
    "preProductionTitle": { en: "PRE-PRODUCTION", ar: "مرحلة ما قبل الإنتاج" },
    "researchAndPlanningTitle": { en: "Research and Planning", ar: "البحث والتخطيط" },
    "researchAndPlanningText": { en: "Gather comprehensive information about Riyadh Valley Co.'s history, achievements, and future projects. Conduct meetings with key stakeholders to understand their vision and expectations.", ar: "نجمع معلومات شاملة حول تاريخ شركة وادي الرياض وإنجازاتها ومشاريعها المستقبلية، ونعقد لقاءات مع أصحاب القرار لفهم رؤيتهم وتوقعاتهم بعمق." },
    "scriptDevelopmentTitle": { en: "Script Development", ar: "تطوير السيناريو" },
    "scriptDevelopmentText": { en: "Develop a detailed script that narrates the story of Riyadh Valley Co., highlighting the main points to be covered. The script will undergo reviews and approvals to ensure it aligns with the company's message and tone.", ar: "نطور سيناريو مفصل يحكي قصة شركة وادي الرياض ويسلط الضوء على المحاور الرئيسية. يخضع السيناريو لمراجعات دقيقة واعتمادات لضمان توافقه مع رسالة الشركة وهويتها." },
    "storyboardCreationTitle": { en: "Storyboard Creation", ar: "إعداد المخطط البصري" },
    "storyboardCreationText": { en: "Create a storyboard that visually represents the script. This will outline each scene and shot, providing a clear blueprint for the video production.", ar: "ننشئ مخططاً بصرياً يجسد السيناريو ويحدد كل مشهد ولقطة، مما يوفر خارطة طريق واضحة لعملية الإنتاج." },
    "logisticsAndSchedulingTitle": { en: "Logistics and Scheduling", ar: "التنسيق اللوجستي والجدولة" },
    "logisticsAndSchedulingText": { en: "Plan the logistics for video shoots, including locations, schedule, and necessary permissions. Arrange for equipment and crew required for the shoot.", ar: "نخطط للجوانب اللوجستية لعمليات التصوير شاملة المواقع والجداول الزمنية والتصاريح المطلوبة، مع تأمين المعدات وطاقم العمل اللازم." },
    "productionTitle": { en: "Methodology", ar: "المنهجية" },
    "productionTitle-section": { en: "PRODUCTION", ar: "الإنتاج" },
    "filmingTitle": { en: "Filming", ar: "التصوير" },
    "filmingText": { en: "Conduct video shoots at various locations, including Riyadh Valley Co.'s facilities, project sites, and offices. Capture high-quality footage of the company's environment, activities, and products.", ar: "ننفذ عمليات التصوير في مواقع متنوعة تشمل مرافق شركة وادي الرياض ومواقع المشاريع والمكاتب، مع التقاط لقطات عالية الجودة لبيئة الشركة وأنشطتها ومنتجاتها." },
    "interviewsTitle": { en: "Interviews", ar: "المقابلات الشخصية" },
    "interviewsText": { en: "Record interviews with key personnel, stakeholders, and clients. These interviews will provide authentic insights and add a personal touch to the video.", ar: "نسجل مقابلات مع الشخصيات المحورية وأصحاب المصلحة والعملاء، والتي تضفي رؤى حقيقية ولمسة إنسانية على العمل المرئي." },
    "bRollFootageTitle": { en: "B-Roll Footage", ar: "اللقطات المساندة" },
    "bRollFootageText": { en: "Capture supplementary footage (B-roll) to enhance the narrative and provide context. This includes shots of the work environment, team interactions, and project highlights.", ar: "نلتقط لقطات مساندة تثري السرد وتوفر السياق المطلوب، وتشمل مشاهد بيئة العمل وتفاعل الفرق وأبرز المشاريع." },
    "postProductionTitle2": { en: "POST-PRODUCTION", ar: "مرحلة ما بعد الإنتاج" },
    "editingTitle": { en: "Editing", ar: "المونتاج" },
    "editingText": { en: "Edit the captured footage to create a coherent and engaging storyline. This includes cutting, sequencing, and enhancing the visual and audio quality.", ar: "نقوم بمونتاج اللقطات المصورة لإنشاء حبكة متماسكة وجذابة، شاملة القص والتسلسل وتحسين الجودة المرئية والصوتية." },
    "visualEnhancementsTitle": { en: "Visual Enhancements", ar: "التحسينات البصرية" },
    "visualEnhancementsText": { en: "Add animations, infographics, and other visual elements to highlight key information and make the video visually appealing.", ar: "نضيف الرسوم المتحركة والإنفوجرافيك والعناصر البصرية الأخرى لإبراز المعلومات الأساسية وجعل العمل جذاباً بصرياً." },
    "soundDesignTitle": { en: "Sound Design", ar: "تصميم الصوت" },
    "soundDesignText": { en: "Incorporate background music, sound effects, and voiceovers to enhance the overall impact of the video.", ar: "ندمج الموسيقى التصويرية والمؤثرات الصوتية والتعليق الصوتي لتعزيز التأثير العام للعمل." },
    "finalizationTitle": { en: "Finalization", ar: "اللمسة الأخيرة" },
    "finalizationText": { en: "Complete the final edit, ensuring all elements are polished and the video is ready for distribution.", ar: "نكمل المونتاج النهائي مع التأكد من صقل جميع العناصر وجاهزية العمل للعرض والتوزيع." },
    "reviewAndFeedbackTitle": { en: "Review and Feedback", ar: "المراجعة والتطوير" },
    "reviewAndFeedbackText": { en: "Present the initial cut to Riyadh Valley Co. for review and feedback. Make necessary revisions to ensure the final video meets expectations.", ar: "نعرض النسخة الأولية على شركة وادي الرياض للمراجعة والحصول على التغذية الراجعة، ونجري التعديلات اللازمة لضمان تلبية العمل النهائي للتوقعات." },

    "eventManagementTitle": { en: "OUR SERVICES – EVENT MANAGEMENT", ar: "خدماتنا - تنظيم الفعاليات" },
    "conferenceAndForumsTitle": { en: "Conference and Forums", ar: "المؤتمرات والمنتديات" },
    "conferenceAndForumsText": { en: "Our services are like hosting a series of top-notch conferences and dynamic forums, creating an atmosphere that's both informative and interactive.", ar: "نتخصص في تنظيم مؤتمرات رفيعة المستوى ومنتديات تفاعلية، نخلق من خلالها أجواء غنية بالمعلومات والتفاعل الإيجابي." },
    "awardingCeremoniesTitle": { en: "Awarding Ceremonies & Inaugurations", ar: "حفلات التكريم والافتتاحات" },
    "awardingCeremoniesText": { en: "TIMELINE deals with clients from various branches of business and industry. Our team is able to organize a ceremony for any occasion and request.", ar: "نتعامل مع عملاء من مختلف القطاعات التجارية والصناعية، وفريقنا قادر على تنظيم احتفالية مميزة لأي مناسبة ووفقاً لأي متطلبات." },
    "festivalsTitle": { en: "Festivals", ar: "المهرجانات" },
    "festivalsText": { en: "TIMELINE team knows how to make festival organizing quicker, lighter and more productive. We turn ideas into unforgettable events.", ar: "يعرف فريق تايم لاين كيف يجعل تنظيم المهرجانات أكثر سلاسة وفعالية وإنتاجية. نحول الأفكار إلى تجارب لا تُنسى." },
    "productAndServicesLaunchesTitle": { en: "Product and Services Launches", ar: "فعاليات إطلاق المنتجات والخدمات" },
    "productAndServicesLaunchesText": { en: "TIMELINE is ready to create a launch event for your new product. This moment must be carefully prepared and planned to make a powerful impact.", ar: "تايم لاين مستعدة لإبداع فعالية إطلاق مبهرة لمنتجكم الجديد. هذه اللحظة المحورية تتطلب إعداداً دقيقاً وتخطيطاً محكماً لإحداث أثر قوي ومؤثر." },
    "openingCeremoniesTitle": { en: "Opening Ceremonies", ar: "حفلات الافتتاح" },
    "openingCeremoniesText": { en: "Our opening ceremonies are a spectacle of excellence, blending innovation and elegance to create unforgettable moments.", ar: "حفلات الافتتاح التي ننظمها هي عروض تميز حقيقية، نمزج فيها الابتكار بالأناقة لخلق لحظات استثنائية تبقى في الذاكرة." },
    "exhibitionsAndTradeShowsTitle": { en: "Exhibitions and Trade Shows", ar: "المعارض والفعاليات التجارية" },
    "exhibitionsAndTradeShowsText": { en: "TIMELINE exhibitions aim to attract a large audience, including potential customers and clients, through compelling show designs.", ar: "معارض تايم لاين تهدف لاستقطاب جماهير واسعة تشمل العملاء والعملاء المحتملين، من خلال تصاميم عرض مبتكرة وجذابة." },
    "eventOrganizingTitle": { en: "Event Organizing", ar: "تنظيم الفعاليات" },
    "eventOrganizingText": { en: "We organize all types of events: corporate, social, virtual, fundraising, festivals, community, and pop-up events.", ar: "ننظم جميع أنواع الفعاليات: المؤسسية والاجتماعية والافتراضية والخيرية والمهرجانات والمجتمعية والمؤقتة." },
    "exhibitionStandsTitle": { en: "Exhibition Stands", ar: "أجنحة المعارض" },
    "exhibitionStandsText": { en: "We design and build exhibition stands using our full in-house facilities, delivering quality and creativity.", ar: "نصمم وننشئ أجنحة المعارض بمرافقنا المتكاملة، نقدم من خلالها أعلى معايير الجودة والإبداع." },
    "designServicesTitle": { en: "Design Services", ar: "خدمات التصميم" },
    "designServicesText": { en: "We provide a full range of design services including branding, graphic design, and interior design to elevate your event presence.", ar: "نقدم مجموعة شاملة من خدمات التصميم تشمل الهوية البصرية والتصميم الجرافيكي والتصميم الداخلي لترقية حضور فعاليتكم." },
    "interactiveSolutionsTitle": { en: "Interactive Solutions", ar: "الحلول التفاعلية" },
    "interactiveSolutionsText": { en: "TIMELINE focuses on the latest technologies, implementing interactive solutions into every project for an immersive experience.", ar: "تركز تايم لاين على أحدث التقنيات، وتدمج الحلول التفاعلية في كل مشروع لتوفير تجربة غامرة ومؤثرة." },
    "innovativeTechnologiesTitle": { en: "Innovative Technologies", ar: "التقنيات المبتكرة" },
    "innovativeTechnologiesText": { en: "We offer 3D mapping, holograms, content creation, and installation services to bring cutting-edge tech to your events.", ar: "نوفر خدمات الإسقاط ثلاثي الأبعاد والهولوجرام وإنتاج المحتوى والتركيب التقني لجلب أحدث التقنيات إلى فعالياتكم." },
    "animationContentTitle": { en: "Animation Content", ar: "المحتوى المتحرك" },
    "animationContentText": { en: "TIMELINE creates engaging cartoons, advertisements, promotional videos, and 3D content for mapping and visual storytelling.", ar: "تبدع تايم لاين في إنتاج الرسوم المتحركة والإعلانات والفيديوهات الترويجية والمحتوى ثلاثي الأبعاد للإسقاط والسرد البصري." },

    "timeLapseTitle": { en: "OUR SERVICES – TIME LAPSE", ar: "خدماتنا - تايم لابس" },
    "constructionTimelapseTitle": { en: "Construction Timelapse", ar: "تايم لابس للإنشاءات" },
    "constructionTimelapseText": { en: "We use our own studio and AI-based techniques to produce long-term timelapse footage of construction projects, offering unmatched visual quality and detail.", ar: "نستخدم استوديوهاتنا المتطورة وتقنيات الذكاء الاصطناعي لإنتاج مقاطع زمنية طويلة المدى لمشاريع الإنشاءات، نوفر من خلالها جودة بصرية وتفاصيل لا مثيل لها." },
    "droneFilmingTitle": { en: "Drone Filming", ar: "التصوير الجوي بالدرون" },
    "droneFilmingText": { en: "Drones offer dynamic, efficient, and flexible timelapse footage of construction sites, capturing wide views and hard-to-reach areas with ease.", ar: "توفر طائرات الدرون لقطات زمنية ديناميكية وفعالة ومرنة لمواقع الإنشاءات، تلتقط المناظر الواسعة والمناطق صعبة الوصول بسهولة فائقة." },
    "photography2Title": { en: "Photography", ar: "التصوير الفوتوغرافي" },
    "photography2Text": { en: "Using photography equipment for stills provides high-resolution images at a lower cost compared to traditional film equipment.", ar: "استخدام معدات التصوير الفوتوغرافي للصور الثابتة يوفر صوراً عالية الدقة بتكلفة أقل مقارنة بمعدات التصوير السينمائي التقليدية." },
    "progressDocumentaryTitle": { en: "Progress Documentary", ar: "التوثيق الزمني للتقدم" },
    "progressDocumentaryText": { en: "We document the full journey of your construction project. Our time-separation timelapse narrates weeks or months of progress in minutes, providing clarity, transparency, and impact.", ar: "نوثق الرحلة الكاملة لمشروع الإنشاءات الخاص بكم. تقنية تايم لابس المتقطع تحكي قصة أسابيع أو شهور من التقدم في دقائق معدودة، مما يوفر الوضوح والشفافية والتأثير." },
    "interiorTimelapseTitle": { en: "Interior Timelapse", ar: "تايم لابس للمساحات الداخلية" },
    "interiorTimelapseText": { en: "Showcasing the transformation of interior spaces through elegant time-lapse storytelling—perfect for highlighting the evolution of your design projects.", ar: "نعرض تحول المساحات الداخلية من خلال سرد زمني أنيق - مثالي لإبراز تطور مشاريع التصميم الخاصة بكم." },

    "experienceTitle": { en: "OUR EXPERIENCE", ar: "خبراتنا" },
    "awardsTitle": { en: "OUR INTERNATIONAL AWARDS", ar: "جوائزنا الدولية" },
    "ourClientsTitle": { en: "OUR CLIENTS", ar: "عملاؤنا" },
    "whatOurClientsSayTitle": { en: "What Our Clients Say", ar: "آراء عملائنا" },
    "testimonialsDescription": { en: "We are proud of the work we've done for our clients. Here are some of their testimonials.", ar: "نفتخر بالأعمال التي أنجزناها لعملائنا. إليكم بعض من شهاداتهم." },
    "contactTitle": { en: "Contact", ar: "تواصل معنا" },
    "contactDescription": { en: "Contact us for inquiries and more information.", ar: "تواصلوا معنا للاستفسارات والمزيد من المعلومات." },
    "footerUsefulLinksTitle": { en: "Useful Links", ar: "روابط مفيدة" },
    "footerOurServicesTitle": { en: "Our Services", ar: "خدماتنا" },


    // Conact Info Section
    "rihadhLocation": { en: "RIYADH", ar: "الرياض" },
    "saudiArabia": { en: "Kingdom of Saudi Arabia", ar: "المملكة العربية السعودية" }
    , "saudiArabia2": { en: "Kingdom of Saudi Arabia", ar: "المملكة العربية السعودية" }
    ,
    "contactCallUsRiyadh": { en: "Call Us (RIYADH)", ar: "اتصل بنا (الرياض)" }
    ,
    "riyadhDescription": { en: "TIMELINE for Production and Events", ar: "تايم لاين للإنتاج والفعاليات" },
    "riyadhAddress": { en: "P.O. Box 235800 Riyadh 11332", ar: "ص.ب 235800 الرياض 11332" },
    "riyadhAddress2": {
      "en": "P.O. Box",
      "ar": "ص.ب"
    },
    "riyadhAddressRiyadh": {
      "en": "Riyadh",
      "ar": "الرياض"
    },
    "riyadhAddressNumbers": {
      "boxNumber": "235800",
      "postalCode": "11332"
    },

    "telLabel": {
      en: "Tel:",
      ar: "الهاتف:"
    },
    "mobLabel": {
      en: "Mob:",
      ar: "الجوال:"
    },
    "mobLabe2": {
      en: "Mob2:",
      ar: "جوال 2:"
    },
    "telLabel-2": {
      en: "Tel:",
      ar: "الهاتف:"
    },
    "mobLabel-2": {
      en: "Mob:",
      ar: "الجوال:"
    },
    "mobLabe2-2": {
      en: "Mob2:",
      ar: "جوال 2:"
    },
    "telLabel-3": {
      en: "Tel:",
      ar: "الهاتف:"
    },
    "mobLabel-3": {
      en: "Mob:",
      ar: "الجوال:"
    },
    "mobLabel-4": {
      en: "Mob:",
      ar: "الجوال:"
    },
    "telLabel-4": {
      en: "Tel:",
      ar: "الهاتف:"
    },
    "mobLabel-5": {
      en: "Mob:",
      ar: "الجوال:"
    },
    "mobLabe2-3": {
      en: "Mob2:",
      ar: "جوال 2:"
    },

    "riyadhTel": { en: "+966 11 464 3719", ar: "+966 11 464 3719" },
    "riyadhMob": { en: "+966 50 440 3847", ar: "+966 50 440 3847" },
    "riyadhMob2": { en: "+966 53 238 7201", ar: "+966 53 238 7201" },
    "emailUs": { en: "Email Us", ar: "راسلنا عبر البريد الإلكتروني" },

    // Cairo Location
    "cairoLocation": { en: "CAIRO", ar: "القاهرة" },
    "cairoDescription": { en: "TIMELINE for Production", ar: "تايم لاين للإنتاج" },
    "cairoAddress": { en: "Bavaria Town, Building 18, Floor 9, Apartment 1", ar: "مدينة بافاريا، المبنى 18، الطابق 9، الشقة 1" },
    "cairoTel": { en: "+2 02 236 5870", ar: "+2 02 236 5870" },
    "cairoMob": { en: "+2 010 9177 2344", ar: "+2 010 9177 2344" },
    "cairoMob2": { en: "+2 010 9177 2344", ar: "+2 010 9177 2344" },
    "contactCallUsCairo": { en: "Call Us (CAIRO)", ar: "اتصل بنا (القاهرة)" },
    "contactEgypt": { en: "EGYPT", ar: "مصر" },
    // London Location
    "londonLocation": { en: "LONDON", ar: "لندن" },
    "contactUnitedKingdom": { en: "United Kingdom", ar: "المملكة المتحدة" },
    "contactCallUsLondon": { en: "Call Us (LONDON)", ar: "اتصل بنا (لندن)" },
    "londonDescription": { en: "TIMELINE resources ltd", ar: "تايم لاين للموارد المحدودة" },
    "londonAddress": { en: "6TH FLOOR GRACECHURCH STREET", ar: "الطابق السادس، شارع جريس تشورش" },
    "londonTel": { en: "+44 207 264 4444", ar: "+44 207 264 4444" },
    "londonMob": { en: "+44 795 718 5593", ar: "+44 795 718 5593" },

    // Istanbul Location
    "istanbulLocation": { en: "ISTANBUL", ar: "إسطنبول" },

    "contactIstanbul": { en: "KAGITHANE/ ISTANBUL", ar: "كاجيثان / اسطنبول" },

    "contactCallUsIstanbul": { en: "Call Us (ISTANBUL)", ar: "اتصل بنا (اسطنبول)" }
    ,
    "istanbulDescription": { en: "TIMELINE for Production", ar: "تايم لاين للإنتاج" },
    "istanbulAddress": { en: "GÜRSEL MAH. 28 NİSAN CAD. NO: 6 İÇ KAPI NO: 3 KAĞITHANE / İSTANBUL", ar: "حي غورسل، شارع 28 نيسان، المبنى رقم 6، الباب الداخلي رقم 3، في منطقة كاغيتهانه، إسطنبول" },
    "istanbulMob": { en: "+90 535 551 1442", ar: "+90 535 551 1442" },

    "eventManagementLink": { en: "Event Management", ar: "إدارة الفعاليات" },
    "ourServicesProductionLink": { en: "Our Services - Production", ar: "خدماتنا - الإنتاج" },
    "productionLink": { en: "Production", ar: "الإنتاج" },
    "preProductionLink": { en: "Pre-Production", ar: "مرحلة ما قبل الإنتاج" },
    "postProductionLink": { en: "Post-Production", ar: "مرحلة ما بعد الإنتاج" },
    "timeLapseLink": { en: "Time Lapse", ar: "الفاصل الزمني" },
    "experienceLink": { en: "Experience", ar: "خبرتنا" },
    "footerCopyright": { en: "Copyright", ar: "حقوق الطبع والنشر" },
    "footerAllRightsReserved": { en: "All Rights Reserved", ar: "جميع الحقوق محفوظة" },
    "designedBy": { en: "Designed by", ar: "صمم بواسطة" },
    "privacyPolicy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },

    // Awards Section


    "awardsTitle": { "en": "OUR INTERNATIONAL AWARDS", "ar": "جوائزنا الدولية" },

    "award2015Title": { "en": "⭐ MEA BUSINESS AWARDS 2015", "ar": "⭐ جوائز الأعمال MEA لعام 2015" },
    "award2015Text": { "en": "Best Audiovisual Company 2015 in Saudi Arabia", "ar": "أفضل شركة إنتاج مرئي ومسموع في السعودية 2015" },

    "award2016Title": { "en": "⭐ MEA BUSINESS AWARDS 2016", "ar": "⭐ جوائز الأعمال MEA لعام 2016" },
    "award2016Text": { "en": "Best Audiovisual Company 2016 in Saudi Arabia", "ar": "أفضل شركة إنتاج مرئي ومسموع في السعودية 2016" },

    "awardCLW2016Title": { "en": "⭐ Corporate LiveWire Innovation & Excellence Awards 2016", "ar": "⭐ جوائز Corporate LiveWire للابتكار والتميز 2016" },
    "awardCLW2016Text": { "en": "Innovation and Excellence in Audiovisual Production in Saudi Arabia", "ar": "الابتكار والتميز في الإنتاج المرئي والمسموع في السعودية" },

    "awardCLW2017Title": { "en": "⭐ Corporate LiveWire Innovation & Excellence Awards 2017", "ar": "⭐ جوائز Corporate LiveWire للابتكار والتميز 2017" },
    "awardCLW2017Text": { "en": "Innovation & Excellence for Content Management in Audiovisual Production ", "ar": "الابتكار والتميز في إدارة المحتوى بالإنتاج المرئي والمسموع" },

    "awardAI2018Title": { "en": "⭐ Acquisition International Global Excellence Awards 2018", "ar": "⭐ جوائز التميز العالمية من Acquisition International لعام 2018" },
    "awardAI2018Text": { "en": "Most Advanced Video Production Company 2018 – 9K Quality Innovators", "ar": "أكثر شركات الإنتاج تطورًا لعام 2018 – مبتكرو جودة 9K" }
    ,

    "client1TitleText": { en: "The Biban exhibition by Monshaat", ar: "معرض بيبان من منشآت" },
    "client1TextText": { en: "(Dammam, Riyadh) 2019 - (Hael, Riyadh) 2019 (Riyadh, Riyadh) 2020", ar: "(الدمام، الرياض) 2019 - (حائل، الرياض) 2019 (الرياض، الرياض) 2020" },
    "client2TitleText": { en: "The annual ceremony of Bank Albilad", ar: "الحفل السنوي لبنك البلاد" },
    "client2TextText": { en: "2019", ar: "2019" },
    "client3TitleText": { en: "In partnership with Grocery Agency", ar: "بالشراكة مع وكالة البقالة" },
    "client3TextText": { en: "The organization of the Half Million Celebration (fifth annual celebration), and the inauguration ceremony for Details Real Estate 2023", ar: "تنظيم احتفالية نصف المليون (الاحتفال السنوي الخامس)، وحفل افتتاح تفاصيل العقارية 2023" },
    "client4TitleText": { en: "Awarding ceremony for donating companies", ar: "حفل تكريم الشركات المتبرعة" },
    "client4TextText": { en: "Charity events 2022 / 2021", ar: "الفعاليات الخيرية 2022 / 2021" },
    "client5TitleText": { en: "Inauguration ceremony of Wa\'ad Al Shamal", ar: "حفل افتتاح وعد الشمال" },
    "client5TextText": { en: "(Ministry of Mineral Resources)", ar: "(وزارة الثروة المعدنية)" },
    "client6TitleText": { en: "Inauguration ceremony of Ras Al Khair", ar: "حفل افتتاح رأس الخير" },
    "client6TextText": { en: "(Ministry of Industry and Mineral Resources)", ar: "(وزارة الصناعة والثروة المعدنية)" },
    "client7TitleText": { en: "Three day winter ceremony", ar: "حفل الشتاء لمدة ثلاثة أيام" },
    "client7TextText": { en: "On the premises of the university 2021", ar: "على أراضي الجامعة 2021" },
    "client8TitleText": { en: "In partnership with The Three", ar: "بالشراكة مع ذا ثري" },
    "client8TextText": { en: "Outstanding City Projects Exhibition 2022", ar: "معرض مشاريع المدينة المتميزة 2022" },
    "client9TitleText": { en: "Exhibition of distinguished cities", ar: "معرض المدن المتميزة" },
    "client9TextText": { en: "In the era of the Custodian of the Two Holy Mosques", ar: "في عهد خادم الحرمين الشريفين" },
    "client10TitleText": { en: "The annual ceremony of SABB", ar: "الحفل السنوي للبنك السعودي البريطاني" },
    "client10TextText": { en: "2022", ar: "2022" },
    "experienceItem1": {
      en: "▻ The inauguration ceremony of Wa'ad Al Shamal (Ministry of Mineral Resources).",
      ar: "◅ حفل افتتاح مشروع وعد الشمال - وزارة الثروة المعدنية"
    },
    "experienceItem2": {
      en: "▻ The inauguration ceremony of Ras Al Khair (Ministry of Industry and Mineral Resources).",
      ar: "◅ حفل افتتاح مشروع رأس الخير - وزارة الصناعة والثروة المعدنية"
    },
    "experienceItem3": {
      en: "▻ The exhibition of distinguished cities in the era of the Custodian of the Two Holy Mosques.",
      ar: "◅ معرض المدن المتميزة في عهد خادم الحرمين الشريفين"
    },
    "experienceItem4": {
      en: "▻ The Biban exhibition by Monshaat (Dammam, Riyadh) 2019.",
      ar: "◅ معرض بيبان لريادة الأعمال - منشآت (الدمام والرياض) 2019"
    },
    "experienceItem5": {
      en: "▻ The Biban exhibition by Monshaat (Hael, Riyadh) 2019.",
      ar: "◅ معرض بيبان لريادة الأعمال - منشآت (حائل والرياض) 2019"
    },
    "experienceItem6": {
      en: "▻ The Biban exhibition by Monshaat (Riyadh, Riyadh) 2020.",
      ar: "◅ معرض بيبان لريادة الأعمال - منشآت (الرياض) 2020"
    },
    "experienceItem7": {
      en: "▻ The annual ceremony of Bank Albilad 2019.",
      ar: "◅ الحفل السنوي لبنك البلاد 2019"
    },
    "experienceItem8": {
      en: "▻ The annual ceremony of SABB 2022.",
      ar: "◅ الحفل السنوي للبنك السعودي البريطاني (ساب) 2022"
    },
    "experienceItem9": {
      en: "▻ In partnership with The Three offer Outstanding City Projects Exhibition 2022.",
      ar: "◅ بالشراكة مع ذا ثري: معرض المشاريع العمرانية المميزة 2022"
    },
    "experienceItem10": {
      en: "▻ In partnership with Grocery Agency, the organization of the Half Million Celebration (fifth annual celebration), and the inauguration ceremony for Details Real Estate 2023.",
      ar: "◅ بالشراكة مع وكالة جروسري: تنظيم احتفالية النصف مليون (النسخة الخامسة) وحفل افتتاح شركة ديتيلز العقارية 2023"
    },
    // contact form
    "label-name": { en: "Your Name", ar: "الاسم" },
    "label-email": { en: "Your Email", ar: "البريد الإلكتروني" },
    "label-subject": { en: "Subject", ar: "الموضوع" },
    "label-message": { en: "Message", ar: "الرسالة" },

    "text-loading": {
      en: "Loading",
      ar: "جاري الإرسال..."
    },
    "text-error": {
      en: "An error occurred",
      ar: "حدث خطأ، حاول مرة أخرى"
    },
    "text-sent": {
      en: "Your message has been sent. Thank you!",
      ar: "تم إرسال رسالتك. شكرًا لك!"
    },

    "btn-send": {
      en: "Send Message",
      ar: "إرسال الرسالة"
    },
    "btn-see-more": {
      en: "See more",
      ar: "رؤية المزيد"
    },


  }

  let currentLanguage = localStorage.getItem("language") || "ar";

  function updateLanguage() {
    for (const id in elementsToTranslate) {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = elementsToTranslate[id][currentLanguage];
      }
    }

    // تحديث لغة الصفحة واتجاه النص
    document.documentElement.lang = currentLanguage === "en" ? "en" : "ar";
    // document.style.direction = currentLanguage === "en" ? "ltr" : "rtl";
    document.body.style.textAlign = currentLanguage === "en" ? "left" : "right";
    if (languageButton) {
      languageButton.textContent = elementsToTranslate["languageButton"][currentLanguage];
    }
  }

  languageButton.addEventListener("click", function () {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    localStorage.setItem("language", currentLanguage);
    updateLanguage();
    console.log(localStorage.getItem("language"));
  });

  updateLanguage(); // تطبيق اللغة المختارة عند تحميل الصفحة
});



document.addEventListener('DOMContentLoaded', function () {
  const footerAboutDiv = document.querySelector('.footer-about');

  function isArabic() {
    const htmlElement = document.querySelector('html');
    return htmlElement.getAttribute('lang') === 'ar';
    // يمكنك استخدام طريقة أخرى للتحقق من اللغة إذا لزم الأمر
    // return document.body.classList.contains('rtl');
  }

  if (footerAboutDiv) {
    if (isArabic()) {
      footerAboutDiv.classList.remove('text-md-start');
      footerAboutDiv.classList.add('text-md-end');
    } else {
      footerAboutDiv.classList.remove('text-md-end');
      footerAboutDiv.classList.add('text-md-start');
    }
  }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
// assets/js/main.js (Add/Modify this section inside your DOMContentLoaded listener)

document.addEventListener('DOMContentLoaded', () => {
  // ... (Your existing code for translations, data-href, data-content, etc.) ...

  // --- Apply SRC for iframes (data-src) ---
  document.querySelectorAll('iframe[data-src]').forEach(element => {
    const srcConstant = element.dataset.src; // Access value of data-src
    if (LINKS[srcConstant]) {
      element.src = LINKS[srcConstant];
    }
  });

  // Apply href for anchor tags and link tags (data-href)
  document.querySelectorAll('[data-href]').forEach(element => {
    const urlConstant = element.dataset.href; // Access value of data-href
    if (LINKS[urlConstant]) {
      element.href = LINKS[urlConstant];
    }
  });

});


document.addEventListener('DOMContentLoaded', () => {
  // Function to apply background image
  const applyBackgroundImage = (selector, imageUrl) => {
    const element = document.querySelector(selector);
    if (element) {
      // Keep the linear-gradient part consistent with your CSS
      element.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${imageUrl}')`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
      element.style.backgroundRepeat = 'no-repeat';
      element.style.backgroundAttachment = 'fixed';
    }
  };

  // Apply images to their respective sections
  applyBackgroundImage('.post-production', IMAGE_PATHS.POST_PRODUCTION_BG);
  applyBackgroundImage('.our-services', IMAGE_PATHS.OUR_SERVICES_BG);
  applyBackgroundImage('.pre-production', IMAGE_PATHS.PRE_PRODUCTION_BG);
  applyBackgroundImage('.production', IMAGE_PATHS.PRODUCTION_BG);
  applyBackgroundImage('.event-management', IMAGE_PATHS.EVENT_MANAGEMENT_BG);
  applyBackgroundImage('.time-lapse', IMAGE_PATHS.TIME_LAPSE_BG);
  applyBackgroundImage('.experience', IMAGE_PATHS.EXPERIENCE_BG);
  applyBackgroundImage('.awards', IMAGE_PATHS.AWARDS_BG);
  applyBackgroundImage('.our-clients', IMAGE_PATHS.OUR_CLIENTS_BG);
  applyBackgroundImage('.background-contact', IMAGE_PATHS.CONTACT_BG);


  // --- Video Loading and Autoplay Logic ---
  const video = document.getElementById('heroVideo'); // Get the video element by its ID
  const videoSource = document.getElementById('heroVideoSource'); // Get the source element by its ID

  if (video && videoSource) {
    // 1. Set the source and poster from constants.js
    video.poster = IMAGE_PATHS.HERO_VIDEO_POSTER;
    videoSource.src = IMAGE_PATHS.HERO_VIDEO_MP4;
    video.load(); // Tell the video element to load the new source

    // 2. Autoplay logic (your provided code)
    const tryPlay = () => {
      video.play().catch((error) => {
        console.log("Autoplay issue:", error);
        // Consider showing a "Play Video" button here if autoplay persistently fails
      });
    };

    // Attempt to play once the DOM is ready and source is set
    tryPlay();

    // Re-attempt playback if visibility changes to visible
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    });

    // Re-attempt playback if video pauses unexpectedly while visible
    video.addEventListener("pause", function () {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    });
  } else {
    console.error("Hero video or video source element not found!");
  }

  // --- Apply iframe sources ---
  const sanadAwardIframe = document.getElementById('sanadAwardIframe');
  if (sanadAwardIframe) {
    sanadAwardIframe.src = VIMEO_EMBEDS.SANAD_AWARD;
  }

  const riyadhValleyIframe = document.getElementById('riyadhValleyIframe');
  if (riyadhValleyIframe) {
    riyadhValleyIframe.src = VIMEO_EMBEDS.RIYADH_VALLEY_FILM;
  }

  const rasAlKhairIframe = document.getElementById('rasAlKhairIframe');
  if (rasAlKhairIframe) {
    rasAlKhairIframe.src = VIMEO_EMBEDS.RAS_AL_KHAIR_PROJECT;
  }

  const tadawulIframe = document.getElementById('tadawulIframe');
  if (tadawulIframe) {
    tadawulIframe.src = VIMEO_EMBEDS.TADAWUL_INFOGRAPHICS;
  }

  const swissCornerIframe = document.getElementById('swissCornerIframe');
  if (swissCornerIframe) {
    swissCornerIframe.src = VIMEO_EMBEDS.SWISS_CORNER_MOTHERS_DAY;
  }

  const acwaPowerIframe = document.getElementById('acwaPowerIframe');
  if (acwaPowerIframe) {
    acwaPowerIframe.src = VIMEO_EMBEDS.ACWA_POWER_CORPORATE_FILM;
  }

  const madinaIframe = document.getElementById('madinaIframe');
  if (madinaIframe) {
    madinaIframe.src = VIMEO_EMBEDS.MADINA_DEVELOPMENT;
  }

  const monshaatIframe = document.getElementById('monshaatIframe');
  if (monshaatIframe) {
    monshaatIframe.src = VIMEO_EMBEDS.MONSHAAT_OVERVIEW;
  }

  const alandalusIframe = document.getElementById('alandalusIframe');
  if (alandalusIframe) {
    alandalusIframe.src = VIMEO_EMBEDS.ALANDALUS_PROPERTY;
  }

  // You might also want to set the "See more" button link from your LINKS object
  const seeMoreButton = document.getElementById('btn-see-more');
  if (seeMoreButton) {
    seeMoreButton.href = LINKS.VIMEO; // Assuming VIMEO is the link to your general Vimeo profile
  }
});