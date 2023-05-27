<?php 
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])) {

 ?>

<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="bootstrap.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
        
        <title>Cris Cakes| Every bite a piece of heaven</title>
    </head>
    <body>
        <script type="text/javascript" src="file.js"></script>
        <div class="menu">
        <img src="img/logo.png" id="logo">
        </div>
        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div class="overlay-content">
                <a href="main.php">Home</a>
                <a href="about.php">About</a>
                <a href="services.php">Order</a>
                <a href="contact.php">Contact</a>
            </div>
        </div>
        <div class="menu">
            <span style="font-size:35px;float:left;cursor:pointer; margin-top:-17px;" onclick="openNav()">&#9776;</span>
        <h2 id="slogan1">Cris CAKES</h2>
            <p id="user"><?php echo "Hello"." ".$_SESSION['name'];?></p>
            <div class="userImg">
                <a href="index.php"><img src="img/account.png"></a>
                <a href="logout.php" id="logout">Logout</a>
            </div>
        <br>
            <h6 id="slogan2">Every bite tastes like heaven</h6>
        </div>
        <div class="lineContact">
            <img src="img/panorama.png">
        </div>
        <div class="contact">
            <h2>CONTACT US</h2>
        </div>
        <div class="icons">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="title">
                            <img src="img/icon1.png">
                            <h2>Live Chat</h2>
                            <p>24/7</p>
                            <a href="#" class="button">Let's Chat</a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="title">
                            <img src="img/icon2.png">
                            <h2>Email</h2>
                            <p>Replies within 2 days</p>
                            <a href="#" class="button">Drop Us A Line</a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="title">
                            <img src="img/icon3.png">
                            <h2>Text</h2>
                            <p>Replies in under a hour</p>
                            <a href="#" class="button">Text Us</a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="title">
                            <img src="img/icon4.png">
                            <h2>Social Media</h2>
                            <p>Response less than 24 hours</p>
                            <a href="#" class="button">Find Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>
        <div class="footer-basic">
        <footer>
            <div class="social">
            <a href="#"><i class="icon ion-social-instagram"></i></a>
            <a href="#"><i class="icon ion-social-snapchat"></i></a>
            <a href="#"><i class="icon ion-social-twitter"></i></a>
            <a href="#"><i class="icon ion-social-facebook"></i></a>
            </div>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="main.php">Home</a></li>
                <li class="list-inline-item"><a href="about.php">About</a></li>
                <li class="list-inline-item"><a href="services.php">Order</a></li>
                <li class="list-inline-item"><a href="contact.php">Contact</a></li>
            </ul>
            <p class="copyright">Cris Cakes © 2022</p>
            </footer>
        </div>
    </body>
</html>

<?php 
}else{
     header("Location: index.php");
     exit();
}
 ?>