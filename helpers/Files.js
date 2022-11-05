    const BasePage = require('../BasePage');
    const USERNAME_INPUT = { id: "fm_usr" }
    const PASSWORD_INPUT = { id: "fm_pwd" }
    const SIGN_IN_BUTTON = { xpath: "//button[@type='submit']" }
    const INDEX_HTML = { xpath: "//a[@title='index.html']" }
    const EDIT_LINK = { xpath: "//a[@class='edit-file']" }
    const TEXTAREA = { id: "normal-editor" }
    const SAVE_BUTTON = { xpath: "//button[@type='button']"};


    class Files extends BasePage{
        constructor(driver) {
            super(driver);
        }

        async openDummyPage(){
            await this.visit('https://files.dummy.dev.uppedevents.com/index.php');
            await this.timeout(1000);
        }
        async loginToDummy(){
            await this.sentKeys(USERNAME_INPUT, "upped");
            await this.sentKeys(PASSWORD_INPUT, "Upped2021!")
            await this.click(SIGN_IN_BUTTON);
        }
        async clickIndexHtmlLink(){
            await this.isDisplayed(INDEX_HTML, 5000);
            await this.timeout(500);
            await this.click(INDEX_HTML);
        }

        async editCode(text){
            await this.isDisplayed(EDIT_LINK, 5000);
            await this.timeout(500);
            await this.click(EDIT_LINK);
            await this.isDisplayed(TEXTAREA, 5000);
            await this.clearInputField(TEXTAREA)
            await this.timeout(1000);
            let newCode = await this.newCode(text)
            await this.sentKeys(TEXTAREA, newCode);
            await this.timeout(1000);
            await this.clickElementReturnedFromAnArray(SAVE_BUTTON, 5);
            await this.timeout(1000);

        }

        async newCode(text){
            return `
         <!DOCTYPE HTML>

    <html lang="">

    <head>
    <title> </title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
  <!--[if lte IE 8]><script src="css/ie/html5shiv.js"></script><![endif]-->
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.dropotron.min.js"></script>
    <script src="js/jquery.scrollgress.min.js"></script>
    <script src="js/jquery.scrolly.min.js"></script>
    <script src="js/jquery.slidertron.min.js"></script>
    <script src="js/skel.min.js"></script>
    <script src="js/skel-layers.min.js"></script>
    <script src="js/init.js"></script>
    <noscript>
     <link rel="stylesheet" href="css/skel.css" />
     <link rel="stylesheet" href="css/style.css" />
     <link rel="stylesheet" href="css/style-xlarge.css" />
    </noscript>
  <!--[if lte IE 9]><link rel="stylesheet" href="css/ie/v9.css" /><![endif]-->
  <!--[if lte IE 8]><link rel="stylesheet" href="css/ie/v8.css" /><![endif]-->
    </head>

    <body class="landing">

    <!-- Header -->
     <header id="header" class="alt skel-layers-fixed">
      <h1><a href="index.html">HTML5 Website <span>by Html5webtemplates.co.uk</span></a></h1>
      <nav id="nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li>
          <a href="" class="icon fa-angle-down">Layouts</a>
          <ul>
            <li><a href="left-sidebar.html">Left Sidebar</a></li>
            <li><a href="right-sidebar.html">Right Sidebar</a></li>
            <li><a href="no-sidebar.html">No Sidebar</a></li>
            <li>
              <a href="">Submenu</a>
              <ul>
                <li><a href="#">Option 1</a></li>
                <li><a href="#">Option 2</a></li>
                <li><a href="#">Option 3</a></li>
                <li><a href="#">Option 4</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><a href="elements.html">Elements</a></li>
      </ul>
    </nav>
    </header>

  

  <!-- One -->
  <section id="one" class="wrapper style1">
    <div class="container">
      <header class="major">
        
        ` + text +`

      </header>
      <div class="slider">
        <span class="nav-previous"></span>
        <div class="viewer">
          <div class="reel">
            <div class="slide">
              <img src="images/slide01.jpg" alt="" />
            </div>
            <div class="slide">
              <img src="images/slide02.jpg" alt="" />
            </div>
            <div class="slide">
              <img src="images/slide03.jpg" alt="" />
            </div>
          </div>
        </div>
        <span class="nav-next"></span>
      </div>
    </div>
  </section>

  <!-- Two -->
  <section id="two" class="wrapper style2">
    <div class="container">
      <div class="row uniform">
        <div class="4u 6u(2) 12u$(3)">
          <section class="feature fa-briefcase">
            <h3>Natoque phasellus</h3>
            <p>Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.</p>
          </section>
        </div>
        <div class="4u 6u$(2) 12u$(3)">
          <section class="feature fa-code">
            <h3>Ultricies dolore</h3>
            <p>Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.</p>
          </section>
        </div>
        <div class="4u$ 6u(2) 12u$(3)">
          <section class="feature fa-save">
            <h3>Magna lacinia</h3>
            <p>Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.</p>
          </section>
        </div>
        <div class="4u 6u$(2) 12u$(3)">
          <section class="feature fa-desktop">
            <h3>Praesent lacinia</h3>
            <p>Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.</p>
          </section>
        </div>
        <div class="4u 6u(2) 12u$(3)">
          <section class="feature fa-camera-retro">
            <h3>Morbi semper</h3>
            <p>Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.</p>
          </section>
        </div>
        <div class="4u$ 6u$(2) 12u$(3)">
          <section class="feature fa-cog">
            <h3>Arcu consequat</h3>
            <p>Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.</p>
          </section>
        </div>
      </div>
    </div>
  </section>

  <!-- Three -->
  <section id="three" class="wrapper style1">
    <div class="container">
      <header class="major">
        <h2>Amet nisl consequat</h2>
        <p>Ipsum dolor tempus commodo turpis adipiscing adipiscing in tempor placerat<br />
          sed amet accumsan enim lorem sem turpis ut. Massa amet erat accumsan curae<br />
          blandit porttitor faucibus in nisl nisi volutpat massa mi non nascetur.</p>
      </header>
      <div class="row">
        <div class="4u 6u(2) 12u$(3)">
          <article class="box post">
            <a href="#" class="image fit"><img src="images/pic01.jpg" alt="" /></a>
            <h3>Sed amet lorem</h3>
            <p>Ipsum dolor tempus et commodo lorem accumsan et adipiscing blandit porttitor feugiat tempus lorem
              faucibus.</p>
            <ul class="actions">
              <li><a href="#" class="button">Learn More</a></li>
            </ul>
          </article>
        </div>
        <div class="4u 6u$(2) 12u$(3)">
          <article class="box post">
            <a href="#" class="image fit"><img src="images/pic02.jpg" alt="" /></a>
            <h3>Massa accumsan</h3>
            <p>Ipsum dolor tempus et commodo lorem accumsan et adipiscing blandit porttitor feugiat tempus lorem
              faucibus.</p>
            <ul class="actions">
              <li><a href="#" class="button">Learn More</a></li>
            </ul>
          </article>
        </div>
        <div class="4u$ 6u(2) 12u$(3)">
          <article class="box post">
            <a href="#" class="image fit"><img src="images/pic03.jpg" alt="" /></a>
            <h3>Faucibus portitor</h3>
            <p>Ipsum dolor tempus et commodo lorem accumsan et adipiscing blandit porttitor feugiat tempus lorem
              faucibus.</p>
            <ul class="actions">
              <li><a href="#" class="button">Learn More</a></li>
            </ul>
          </article>
        </div>
        <div class="4u 6u$(2) 12u$(3)">
          <article class="box post">
            <a href="#" class="image fit"><img src="images/pic04.jpg" alt="" /></a>
            <h3>Non placerat</h3>
            <p>Ipsum dolor tempus et commodo lorem accumsan et adipiscing blandit porttitor feugiat tempus lorem
              faucibus.</p>
            <ul class="actions">
              <li><a href="#" class="button">Learn More</a></li>
            </ul>
          </article>
        </div>
        <div class="4u 6u(2) 12u$(3)">
          <article class="box post">
            <a href="#" class="image fit"><img src="images/pic05.jpg" alt="" /></a>
            <h3>Adipiscing dolor</h3>
            <p>Ipsum dolor tempus et commodo lorem accumsan et adipiscing blandit porttitor feugiat tempus lorem
              faucibus.</p>
            <ul class="actions">
              <li><a href="#" class="button">Learn More</a></li>
            </ul>
          </article>
        </div>
        <div class="4u$ 6u$(2) 12u$(3)">
          <article class="box post">
            <a href="#" class="image fit"><img src="images/pic06.jpg" alt="" /></a>
            <h3>Feugiat tempus</h3>
            <p>Ipsum dolor tempus et commodo lorem accumsan et adipiscing blandit porttitor feugiat tempus lorem
              faucibus.</p>
            <ul class="actions">
              <li><a href="#" class="button">Learn More</a></li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section id="cta" class="wrapper style3">
    <h2>Sed faucibus et consequat</h2>
    <ul class="actions">
      <li><a href="#" class="button big">Get Started</a></li>
    </ul>
  </section>

  <!-- Footer -->
  <footer id="footer">
    <ul class="icons">
      <li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
      <li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
      <li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
      <li><a href="#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li>
      <li><a href="#" class="icon fa-envelope"><span class="label">Envelope</span></a></li>
    </ul>
    <ul class="menu">
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Terms of Use</a></li>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <span class="copyright">
      &copy; Copyright. All rights reserved. Design by <a href="http://www.html5webtemplates.co.uk">Responsive Web
        Templates</a>
    </span>
  </footer>

</body>

</html>
         
         `
        }
    }
    module.exports = Files;