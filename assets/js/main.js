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
  const carousel = document.getElementById('carousel');

  // Create and append images to the carousel
  for (let i = 1; i <= 25; i++) {
    const img = document.createElement('img');
    img.src = `https://timeline.sa/wp-content/uploads/2018/05/tl-clients-${i}.jpg`;
    img.alt = `Client Image ${i}`;
    img.classList.add('client-image');
    carousel.appendChild(img);
  }

  let currentIndex = 0;
  const totalImages = 25;

  // Function to move to the next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = -currentIndex * (document.querySelector('.client-image').clientWidth + 15); // 15px margin between images
    carousel.style.transform = `translateX(${offset}px)`;
  }

  // Function to move to the previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    const offset = -currentIndex * (document.querySelector('.client-image').clientWidth + 15);
    carousel.style.transform = `translateX(${offset}px)`;
  }

  // Automatic slide transition every 3 seconds
  setInterval(nextSlide, 3000);

  // Add event listeners for previous and next buttons
  document.querySelector('.prev').addEventListener('click', prevSlide);
  document.querySelector('.next').addEventListener('click', nextSlide);
});



// ***********************************************************

document.addEventListener("DOMContentLoaded", function () {
  const languageButton = document.getElementById("languageButton");

  const elementsToTranslate = {
    // Navigation
    "homeNav": { en: "Home", ar: "الرئيسية" },
    "homeNav2": { en: "Home", ar: "الرئيسية" },
    "aboutNav": { en: "About", ar: "عن الموقع" },
    "aboutNav2": { en: "About", ar: "عن الموقع" },
    "servicesNav": { en: "Services", ar: "الخدمات" },
    "servicesNav2": { en: "Services", ar: "الخدمات" },
    "awardsNav": { en: "Awards", ar: "الجوائز" },
    "awardsNav2": { en: "Awards", ar: "الجوائز" },
    "contactNav": { en: "Contact", ar: "اتصل بنا" },
    "contactNav2": { en: "Contact", ar: "اتصل بنا" },
    "languageButton": { en: "عربي", ar: "English" },
    // Hero Section
    "heroTitle": { en: "Explore Our Journey", ar: "اكتشف رحلتنا" },
    "heroDescription": { en: "Follow the milestones that shaped our path in audio-visual production, events, and creative storytelling.", ar: "تابع المعالم التي شكلت مسارنا في الإنتاج السمعي البصري والفعاليات ورواية القصص الإبداعية." },
    // Who We Are Section
    "whoWeAreTitle": { en: "Who", ar: "من" },
    "whoWeAreTitleBold": { en: "We Are?", ar: "نحن؟" },
    "aboutText1": { en: "Established in 2010, TIMELINE Production and Events Company has emerged as a premier media production and event management firm based in Riyadh, Saudi Arabia.", ar: "تأسست شركة TIMELINE للإنتاج والفعاليات في عام 2010، وقد برزت كشركة رائدة في إنتاج الوسائط وإدارة الفعاليات ومقرها الرياض، المملكة العربية السعودية." },
    "aboutText2": { en: "Our journey began with a vision to revolutionize the media and event industries through innovative solutions and unparalleled services.", ar: "بدأت رحلتنا برؤية لإحداث ثورة في صناعات الإعلام والفعاليات من خلال الحلول المبتكرة والخدمات التي لا مثيل لها." },
    "aboutText3": { en: "Over the past 15 years, we have consistently delivered exceptional results, earning a reputation for excellence and reliability.", ar: "على مدى السنوات الـ 15 الماضية، قدمنا باستمرار نتائج استثنائية، وحصلنا على سمعة التميز والموثوقية." },
    "ourMissionTitle": { en: "Our Mission", ar: "مهمتنا" },
    "ourMissionText": { en: "Excellence in providing services using the latest equipment with creative minds that understand the needs of our partners and meet their aspirations and give them the best quality and originality.", ar: "التميز في تقديم الخدمات باستخدام أحدث المعدات بعقول مبدعة تفهم احتياجات شركائنا وتلبي تطلعاتهم وتمنحهم أفضل جودة وأصالة." },
    "ourVisionTitle": { en: "Our Vision", ar: "رؤيتنا" },
    "ourVisionText": { en: "To be the best and most reliable production choice in the Kingdom of Saudi Arabia.", ar: "أن نكون الخيار الأفضل والأكثر موثوقية في مجال الإنتاج في المملكة العربية السعودية." },

    // Our Services Section
    "ourServicesProductionTitle": { en: "OUR SERVICES PRODUCTION", ar: "خدماتنا الإنتاجية" },
    "commercialProductionTitle": { en: "Commercial Production", ar: "الإنتاج التجاري" },
    "commercialProductionText": { en: "The company specializes in creating TVc and smc for businesses and brands. This service includes concept development, scriptwriting, filming, editing, and delivering high-quality commercials for television broadcast.", ar: "تتخصص الشركة في إنشاء الإعلانات التلفزيونية والإعلانات القصيرة للشركات والعلامات التجارية. تشمل هذه الخدمة تطوير المفاهيم وكتابة السيناريو والتصوير والتحرير وتقديم إعلانات تجارية عالية الجودة للبث التلفزيوني." },
    "photographyTitle": { en: "Photography", ar: "التصوير الفوتوغرافي" },
    "photographyText": { en: "Our skilled photographers capture stunning images that tell a story, whether it's for events, products, or personal projects.", ar: "يلتقط المصورون المهرة لدينا صورًا مذهلة تحكي قصة، سواء كانت للفعاليات أو المنتجات أو المشاريع الشخصية." },
    "postProductionTitle": { en: "Post Production", ar: "مرحلة ما بعد الإنتاج" },
    "postProductionText": { en: "Our post-production services include editing and refining footage, sound design, color correction, and visual effects to create the final product.", ar: "تشمل خدمات ما بعد الإنتاج لدينا تحرير اللقطات وتهذيبها وتصميم الصوت وتصحيح الألوان والمؤثرات البصرية لإنشاء المنتج النهائي." },
    "motionGraphicsTitle": { en: "Motion Graphics 2D & 3D", ar: "الرسوم المتحركة ثنائية وثلاثية الأبعاد" },
    "motionGraphicsText": { en: "The company specializes in creating both 2D and 3D motion graphics, including animated graphics, visual effects, and dynamic visuals to enhance video content.", ar: "تتخصص الشركة في إنشاء الرسوم المتحركة ثنائية وثلاثية الأبعاد، بما في ذلك الرسوم المتحركة والمؤثرات البصرية والمرئيات الديناميكية لتحسين محتوى الفيديو." },
    "documentaryTitle": { en: "Documentary", ar: "فيلم وثائقي" },
    "documentaryText": { en: "Timeline excels in producing documentaries that tell compelling stories. This service includes researching, filming interviews, editing, and creating the final documentary product.", ar: "تتفوق تايم لاين في إنتاج الأفلام الوثائقية التي تروي قصصًا مقنعة. تشمل هذه الخدمة البحث وتصوير المقابلات والتحرير وإنشاء المنتج الوثائقي النهائي." },
    "corporateFilmProductionTitle": { en: "Corporate Film Production", ar: "إنتاج أفلام الشركات" },
    "corporateFilmProductionText": { en: "From concept to completion, we produce high-quality videos for commercials, corporate presentations, documentaries, and more.", ar: "من المفهوم إلى الإنجاز، ننتج مقاطع فيديو عالية الجودة للإعلانات التجارية وعروض الشركات والأفلام الوثائقية والمزيد." },
    "broadcastServicesTitle": { en: "Broadcast Services", ar: "خدمات البث" },
    "broadcastServicesText": { en: "Broadcast services involve the transmission of audio and video content to a dispersed audience via television, radio, or online streaming platforms, ensuring seamless, high-quality content delivery.", ar: "تشمل خدمات البث نقل المحتوى الصوتي والمرئي إلى جمهور منتشر عبر التلفزيون أو الراديو أو منصات البث المباشر عبر الإنترنت، مما يضمن تقديم محتوى سلس وعالي الجودة." },
    "ivrRecordingTitle": { en: "IVR Recording", ar: "تسجيل الاستجابة الصوتية التفاعلية" },
    "ivrRecordingText": { en: "We provide professional IVR (Interactive Voice Response) recording services for businesses to create efficient, automated phone systems and voice prompts.", ar: "نحن نقدم خدمات تسجيل الاستجابة الصوتية التفاعلية الاحترافية للشركات لإنشاء أنظمة هاتف آلية فعالة وموجهات صوتية." },
    "logisticsServicesTitle": { en: "Logistics Services", ar: "خدمات لوجستية" },
    "logisticsServicesText": { en: "Our logistics services include planning, coordination, and management of all physical and technical aspects required for producing high-quality media content.", ar: "تشمل خدماتنا اللوجستية التخطيط والتنسيق وإدارة جميع الجوانب المادية والتقنية المطلوبة لإنتاج محتوى وسائط عالي الجودة." },
    "preProductionTitle": { en: "PRE-PRODUCTION", ar: "مرحلة ما قبل الإنتاج" },
    "researchAndPlanningTitle": { en: "Research and Planning", ar: "البحث والتخطيط" },
    "researchAndPlanningText": { en: "Gather comprehensive information about Riyadh Valley Co.’s history, achievements, and future projects. Conduct meetings with key stakeholders to understand their vision and expectations.", ar: "جمع معلومات شاملة حول تاريخ شركة وادي الرياض وإنجازاتها ومشاريعها المستقبلية. عقد اجتماعات مع أصحاب المصلحة الرئيسيين لفهم رؤيتهم وتوقعاتهم." },
    "scriptDevelopmentTitle": { en: "Script Development", ar: "تطوير السيناريو" },
    "scriptDevelopmentText": { en: "Develop a detailed script that narrates the story of Riyadh Valley Co., highlighting the main points to be covered. The script will undergo reviews and approvals to ensure it aligns with the company’s message and tone.", ar: "تطوير سيناريو مفصل يروي قصة شركة وادي الرياض، مع تسليط الضوء على النقاط الرئيسية التي سيتم تناولها. سيخضع السيناريو للمراجعات والموافقات لضمان توافقه مع رسالة الشركة ونبرتها." },
    "storyboardCreationTitle": { en: "Storyboard Creation", ar: "إنشاء لوحة القصة" },
    "storyboardCreationText": { en: "Create a storyboard that visually represents the script. This will outline each scene and shot, providing a clear blueprint for the video production.", ar: "إنشاء لوحة قصة تمثل السيناريو بصريًا. سيحدد هذا كل مشهد ولقطة، مما يوفر مخططًا واضحًا لإنتاج الفيديو." },
    "logisticsAndSchedulingTitle": { en: "Logistics and Scheduling", ar: "الخدمات اللوجستية والجدولة" },
    "logisticsAndSchedulingText": { en: "Plan the logistics for video shoots, including locations, schedule, and necessary permissions. Arrange for equipment and crew required for the shoot.", ar: "التخطيط للوجستيات الخاصة بتصوير الفيديو، بما في ذلك المواقع والجدول الزمني والتصاريح اللازمة. ترتيب المعدات والطاقم المطلوب للتصوير." },
    "productionTitle": { en: "PRODUCTION", ar: "مرحلة الإنتاج" },
    "filmingTitle": { en: "Filming", ar: "التصوير" },
    "filmingText": { en: "Conduct video shoots at various locations, including Riyadh Valley Co.'s facilities, project sites, and offices. Capture high-quality footage of the company’s environment, activities, and products.", ar: "إجراء عمليات تصوير الفيديو في مواقع مختلفة، بما في ذلك مرافق شركة وادي الرياض ومواقع المشاريع والمكاتب. التقاط لقطات عالية الجودة لبيئة الشركة وأنشطتها ومنتجاتها." },
    "interviewsTitle": { en: "Interviews", ar: "المقابلات" },
    "interviewsText": { en: "Record interviews with key personnel, stakeholders, and clients. These interviews will provide authentic insights and add a personal touch to the video.", ar: "تسجيل مقابلات مع كبار الموظفين وأصحاب المصلحة والعملاء. ستوفر هذه المقابلات رؤى أصيلة وتضيف لمسة شخصية إلى الفيديو." },
    "bRollFootageTitle": { en: "B-Roll Footage", ar: "لقطات B-Roll" },
    "bRollFootageText": { en: "Capture supplementary footage (B-roll) to enhance the narrative and provide context. This includes shots of the work environment, team interactions, and project highlights.", ar: "التقاط لقطات تكميلية (B-roll) لتعزيز السرد وتوفير السياق. يتضمن ذلك لقطات لبيئة العمل وتفاعلات الفريق وأبرز المشاريع." },
    "postProductionTitle2": { en: "POST-PRODUCTION", ar: "مرحلة ما بعد الإنتاج" },
    "editingTitle": { en: "Editing", ar: "التحرير" },
    "editingText": { en: "Edit the captured footage to create a coherent and engaging storyline. This includes cutting, sequencing, and enhancing the visual and audio quality.", ar: "تحرير اللقطات التي تم التقاطها لإنشاء قصة متماسكة وجذابة. يتضمن ذلك القطع والتسلسل وتحسين الجودة المرئية والصوتية." },
    "visualEnhancementsTitle": { en: "Visual Enhancements", ar: "التحسينات البصرية" },
    "visualEnhancementsText": { en: "Add animations, infographics, and other visual elements to highlight key information and make the video visually appealing.", ar: "إضافة الرسوم المتحركة والمخططات المعلوماتية والعناصر المرئية الأخرى لتسليط الضوء على المعلومات الأساسية وجعل الفيديو جذابًا بصريًا." },
    "soundDesignTitle": { en: "Sound Design", ar: "تصميم الصوت" },
    "soundDesignText": { en: "Incorporate background music, sound effects, and voiceovers to enhance the overall impact of the video.", ar: "دمج الموسيقى الخلفية والمؤثرات الصوتية والتعليقات الصوتية لتعزيز التأثير العام للفيديو." },
    "finalizationTitle": { en: "Finalization", ar: "الإنهاء" },
    "finalizationText": { en: "Complete the final edit, ensuring all elements are polished and the video is ready for distribution.", ar: "أكمل التحرير النهائي، مع ضمان صقل جميع العناصر وجاهزية الفيديو للتوزيع." },
    "reviewAndFeedbackTitle": { en: "Review and Feedback", ar: "المراجعة والتعليقات" },
    "reviewAndFeedbackText": { en: "Present the initial cut to Riyadh Valley Co. for review and feedback. Make necessary revisions to ensure the final video meets expectations.", ar: "تقديم النسخة الأولية إلى شركة وادي الرياض للمراجعة والتعليقات. قم بإجراء المراجعات اللازمة لضمان تلبية الفيديو النهائي للتوقعات." },
    "eventManagementTitle": { en: "OUR SERVICES – EVENT MANAGEMENT", ar: "خدماتنا - إدارة الفعاليات" },
    "conferenceAndForumsTitle": { en: "Conference and Forums", ar: "المؤتمرات والمنتديات" },
    "conferenceAndForumsText": { en: "Our services are like hosting a series of top-notch conferences and dynamic forums, creating an atmosphere that's both informative and interactive.", ar: "خدماتنا تشبه استضافة سلسلة من المؤتمرات والمنتديات الديناميكية رفيعة المستوى، مما يخلق جوًا إعلاميًا وتفاعليًا." },
    "awardingCeremoniesTitle": { en: "Awarding Ceremonies & Inaugurations", ar: "حفلات توزيع الجوائز والافتتاحات" },
    "awardingCeremoniesText": { en: "TIMELINE deals with clients from various branches of business and industry. Our team is able to organize a ceremony for any occasion and request.", ar: "تتعامل TIMELINE مع عملاء من مختلف فروع الأعمال والصناعة. فريقنا قادر على تنظيم حفل لأي مناسبة وطلب." },
    "festivalsTitle": { en: "Festivals", ar: "المهرجانات" },
    "festivalsText": { en: "TIMELINE team knows how to make festival organizing quicker, lighter and more productive. We turn ideas into unforgettable events.", ar: "يعرف فريق TIMELINE كيفية جعل تنظيم المهرجانات أسرع وأخف وزنا وأكثر إنتاجية. نحن نحول الأفكار إلى أحداث لا تنسى." },
    "productAndServicesLaunchesTitle": { en: "Product and Services Launches", ar: "إطلاق المنتجات والخدمات" },
    "productAndServicesLaunchesText": { en: "TIMELINE is ready to create a launch event for your new product. This moment must be carefully prepared and planned to make a powerful impact.", ar: "TIMELINE جاهزة لإنشاء حفل إطلاق لمنتجك الجديد. يجب إعداد هذه اللحظة وتخطيطها بعناية لإحداث تأثير قوي." },
    "openingCeremoniesTitle": { en: "Opening Ceremonies", ar: "حفلات الافتتاح" },
    "openingCeremoniesText": { en: "Our opening ceremonies are a spectacle of excellence, blending innovation and elegance to create unforgettable moments.", ar: "حفلات الافتتاح لدينا هي مشهد من التميز، يمزج بين الابتكار والأناقة لخلق لحظات لا تنسى." },
    "exhibitionsAndTradeShowsTitle": { en: "Exhibitions and Trade Shows", ar: "المعارض والمعارض التجارية" },
    "exhibitionsAndTradeShowsText": { en: "TIMELINE exhibitions aim to attract a large audience, including potential customers and clients, through compelling show designs.", ar: "تهدف معارض TIMELINE إلى جذب جمهور كبير، بما في ذلك العملاء والعملاء المحتملين، من خلال تصميمات عرض مقنعة." },
    "eventOrganizingTitle": { en: "Event Organizing", ar: "تنظيم الفعاليات" },
    "eventOrganizingText": { en: "We organize all types of events: corporate, social, virtual, fundraising, festivals, community, and pop-up events.", ar: "ننظم جميع أنواع الفعاليات: فعاليات الشركات والاجتماعية والافتراضية وجمع التبرعات والمهرجانات والمجتمعية والمنبثقة." },
    "exhibitionStandsTitle": { en: "Exhibition Stands", ar: "منصات المعارض" },
    "exhibitionStandsText": { en: "We design and build exhibition stands using our full in-house facilities, delivering quality and creativity.", ar: "نحن نصمم ونبني منصات المعارض باستخدام مرافقنا الداخلية الكاملة، ونقدم الجودة والإبداع." },
    "designServicesTitle": { en: "Design Services", ar: "خدمات التصميم" },
    "designServicesText": { en: "We provide a full range of design services including branding, graphic design, and interior design to elevate your event presence.", ar: "نحن نقدم مجموعة كاملة من خدمات التصميم بما في ذلك العلامات التجارية والتصميم الجرافيكي والتصميم الداخلي لرفع مستوى حضور فعاليتك." },
    "interactiveSolutionsTitle": { en: "Interactive Solutions", ar: "حلول تفاعلية" },
    "interactiveSolutionsText": { en: "TIMELINE focuses on the latest technologies, implementing interactive solutions into every project for an immersive experience.", ar: "تركز TIMELINE على أحدث التقنيات، وتنفذ حلولًا تفاعلية في كل مشروع لتجربة غامرة." },
    "innovativeTechnologiesTitle": { en: "Innovative Technologies", ar: "تقنيات مبتكرة" },
    "innovativeTechnologiesText": { en: "We offer 3D mapping, holograms, content creation, and installation services to bring cutting-edge tech to your events.", ar: "نحن نقدم خدمات رسم الخرائط ثلاثية الأبعاد والصور المجسمة وإنشاء المحتوى والتركيب لتقديم أحدث التقنيات إلى فعالياتك." },
    "animationContentTitle": { en: "Animation Content", ar: "محتوى الرسوم المتحركة" },
    "animationContentText": { en: "TIMELINE creates engaging cartoons, advertisements, promotional videos, and 3D content for mapping and visual storytelling.", ar: "تنشئ TIMELINE رسومًا كاريكاتورية وإعلانات ومقاطع فيديو ترويجية ومحتوى ثلاثي الأبعاد جذابًا لرسم الخرائط ورواية القصص المرئية." },
    "timeLapseTitle": { en: "OUR SERVICES – TIME LAPSE", ar: "خدماتنا - الفاصل الزمني" },
    "constructionTimelapseTitle": { en: "Construction Timelapse", ar: "الفاصل الزمني للبناء" },
    "constructionTimelapseText": { en: "We use our own studio and AI-based techniques to produce long-term timelapse footage of construction projects, offering unmatched visual quality and detail.", ar: "نحن نستخدم الاستوديو الخاص بنا وتقنيات الذكاء الاصطناعي لإنتاج لقطات فاصل زمني طويلة الأجل لمشاريع البناء، مما يوفر جودة وتفاصيل بصرية لا مثيل لها." },
    "droneFilmingTitle": { en: "Drone Filming", ar: "تصوير الطائرات بدون طيار" },
    "droneFilmingText": { en: "Drones offer dynamic, efficient, and flexible timelapse footage of construction sites, capturing wide views and hard-to-reach areas with ease.", ar: "توفر الطائرات بدون طيار لقطات فاصل زمني ديناميكية وفعالة ومرنة لمواقع البناء، حيث تلتقط مناظر واسعة ومناطق يصعب الوصول إليها بسهولة." },
    "photography2Title": { en: "Photography", ar: "التصوير الفوتوغرافي" },
    "photography2Text": { en: "Using photography equipment for stills provides high-resolution images at a lower cost compared to traditional film equipment.", ar: "يوفر استخدام معدات التصوير الفوتوغرافي للصور الثابتة صورًا عالية الدقة بتكلفة أقل مقارنة بمعدات الأفلام التقليدية." },
    "progressDocumentaryTitle": { en: "Progress Documentary", ar: "فيلم وثائقي عن التقدم" },
    "progressDocumentaryText": { en: "We document the full journey of your construction project. Our time-separation timelapse narrates weeks or months of progress in minutes, providing clarity, transparency, and impact.", ar: "نحن نوثق الرحلة الكاملة لمشروع البناء الخاص بك. يروي الفاصل الزمني لفصل الوقت الخاص بنا أسابيع أو شهور من التقدم في دقائق، مما يوفر الوضوح والشفافية والتأثير." },
    "interiorTimelapseTitle": { en: "Interior Timelapse", ar: "الفاصل الزمني الداخلي" },
    "interiorTimelapseText": { en: "Showcasing the transformation of interior spaces through elegant time-lapse storytelling—perfect for highlighting the evolution of your design projects.", ar: "عرض تحول المساحات الداخلية من خلال سرد قصصي أنيق بفاصل زمني - مثالي لتسليط الضوء على تطور مشاريع التصميم الخاصة بك." },
    "experienceTitle": { en: "OUR EXPERIENCE", ar: "خبرتنا" },
    "awardsTitle": { en: "OUR INTERNATIONAL AWARDS", ar: "جوائزنا العالمية" },
    "ourClientsTitle": { en: "OUR CLIENTS", ar: "عملائنا" },
    "whatOurClientsSayTitle": { en: "What Our Clients Say", ar: "ماذا يقول عملاؤنا" },
    "testimonialsDescription": { en: "We are proud of the work we've done for our clients. Here are some of their testimonials.", ar: "نحن فخورون بالعمل الذي أنجزناه لعملائنا. إليك بعض شهاداتهم." },
    "contactTitle": { en: "Contact", ar: "اتصل بنا" },
    "contactDescription": { en: "Contact us for inquiries and more information.", ar: "اتصل بنا للاستفسارات والمزيد من المعلومات." },
    "footerUsefulLinksTitle": { en: "Useful Links", ar: "روابط مفيدة" },
    "footerOurServicesTitle": { en: "Our Services", ar: "خدماتنا" },
    "testimonial1Text": { en: '"Working with this team was an absolute pleasure. They exceeded all our expectations and delivered high-quality work on time. Their attention to detail and customer care is unmatched."', ar: '"كان العمل مع هذا الفريق متعة مطلقة. لقد تجاوزوا كل توقعاتنا وقدموا عملاً عالي الجودة في الوقت المحدد. اهتمامهم بالتفاصيل ورعاية العملاء لا مثيل له."' },
    "testimonial1Author": { en: "Saul Goodman", ar: "ساول غودمان" },
    "testimonial1Role": { en: "CEO & Founder, Goodman's Corp.", ar: "الرئيس التنفيذي والمؤسس، شركة غودمان." },
    "testimonial2Text": { en: '"The level of professionalism and skill displayed by the team was impressive. They helped us achieve our goals faster than we anticipated and were an essential partner in our success."', ar: '"كان مستوى الاحتراف والمهارة الذي أظهره الفريق مثيرًا للإعجاب. لقد ساعدونا في تحقيق أهدافنا بشكل أسرع مما توقعنا وكانوا شريكًا أساسيًا في نجاحنا."' },
    "testimonial2Author": { en: "Sara Wilsson", ar: "سارة ويلسون" },
    "testimonial2Role": { en: "Lead Designer, Design Studio", ar: "كبير المصممين، استوديو التصميم" },
    "testimonial3Text": { en: '"Their innovative approach helped us reach new heights in our marketing efforts. The results were beyond our expectations and they truly understood our vision."', ar: '"ساعدنا نهجهم المبتكر في الوصول إلى آفاق جديدة في جهودنا التسويقية. كانت النتائج تفوق توقعاتنا وفهموا رؤيتنا حقًا."' },
    "testimonial3Author": { en: "Jena Karlis", ar: "جينا كارليس" },
    "testimonial3Role": { en: "Store Owner, Karlis Boutique", ar: "صاحب المتجر، كارليس بوتيك" },
    "testimonial4Text": { en: '"The team was incredible. They not only delivered excellent results but also made the entire process smooth and enjoyable. I would definitely work with them again."', ar: '"كان الفريق لا يصدق. لم يقدموا نتائج ممتازة فحسب، بل جعلوا العملية بأكملها سلسة وممتعة. بالتأكيد سأعمل معهم مرة أخرى."' },
    "testimonial4Author": { en: "Matt Brandon", ar: "مات براندون" },
    "testimonial4Role": { en: "Freelancer & Digital Marketing Expert", ar: "مستقل وخبير في التسويق الرقمي" },
    "testimonial5Text": { en: '"Excellent work from start to finish. Their professionalism and commitment to our project were evident throughout the entire collaboration. We couldn\'t be happier with the results."', ar: '"عمل ممتاز من البداية إلى النهاية. كان احترافهم والتزامهم بمشروعنا واضحًا طوال فترة التعاون بأكملها. لم نكن لنكون أكثر سعادة بالنتائج."' },
    "testimonial5Author": { en: "John Larson", ar: "جون لارسون" },
    "testimonial5Role": { en: "Entrepreneur, Larson Industries", ar: "رائد أعمال، لارسون للصناعات" }
    , "experience": "Experience"
    ,
    // Contact Info Section
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
    "cairoMob": { en: "+2 010 6456 1113", ar: "+2 010 6456 1113" },
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
    "istanbulAddress": { en: "GÜRSEL MAH. 28 NISAN CAD. NO: 6 IC KAPI NO: 3", ar: "غورسيل ماه. 28 نيسان كاد. رقم 6 باب داخلي رقم 3" },
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
      en: "▻ The inauguration ceremony of Wa’ad Al Shamal (Ministry of Mineral Resources).",
      ar: "◅ حفل تدشين وعد الشمال (وزارة الثروة المعدنية)."
    },
    "experienceItem2": {
      en: "▻ The inauguration ceremony of Ras Al Khair (Ministry of Industry and Mineral Resources).",
      ar: "◅ حفل تدشين رأس الخير (وزارة الصناعة والثروة المعدنية)."
    },
    "experienceItem3": {
      en: "▻ The exhibition of distinguished cities in the era of the Custodian of the Two Holy Mosques.",
      ar: "◅ معرض المدن المتميزة في عهد خادم الحرمين الشريفين."
    },
    "experienceItem4": {
      en: "▻ The Biban exhibition by Monshaat (Dammam, Riyadh) 2019.",
      ar: "◅ معرض بيبان من منشآت (الدمام، الرياض) 2019."
    },
    "experienceItem5": {
      en: "▻ The Biban exhibition by Monshaat (Hael, Riyadh) 2019.",
      ar: "◅ معرض بيبان من منشآت (حائل، الرياض) 2019."
    },
    "experienceItem6": {
      en: "▻ The Biban exhibition by Monshaat (Riyadh, Riyadh) 2020.",
      ar: "◅ معرض بيبان من منشآت (الرياض، الرياض) 2020."
    },
    "experienceItem7": {
      en: "▻ The annual ceremony of Bank Albilad 2019.",
      ar: "◅ الحفل السنوي لبنك البلاد 2019."
    },
    "experienceItem8": {
      en: "▻ The annual ceremony of SABB 2022.",
      ar: "◅ الحفل السنوي للبنك السعودي البريطاني (ساب) 2022."
    },
    "experienceItem9": {
      en: "▻ In partnership with The Three offer Outstanding City Projects Exhibition 2022.",
      ar: "◅ بالشراكة مع The Three: معرض مشاريع المدن البارزة 2022."
    },
    "experienceItem10": {
      en: "▻ In partnership with Grocery Agency, the organization of the Half Million Celebration (fifth annual celebration), and the inauguration ceremony for Details Real Estate 2023.",
      ar: "◅ بالشراكة مع وكالة Grocery: تنظيم احتفالية النصف مليون (الاحتفالية السنوية الخامسة) وحفل تدشين شركة ديتيلز العقارية 2023."
    }

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
