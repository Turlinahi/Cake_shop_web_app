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
        <div class="line"></div>
        <div class="page">
            <h2>ABOUT</h2>
        </div>
        <div class="box2">
            <img src="img/baking.png">
            <div class="write">
                <h1>About Us</h1>
                <p>Based on the love for giving people a smile in hard times, Cris Cakes was born as a dream of a mother that became true. From that moment, it continues to amaze people and give them the sweetest dreams of their lives.</p>
            </div>
        </div>
        <div class="team">
            <h2>Our Team</h2>
            <hr>
        </div>
        <div class="card1">
            <img src="img/profile1.jfif">
            <p id="namecard">Cris White</p>
            <p id="work">Founder</p>
            <a href="">Contact</a>
        </div>
        <div class="card2">
            <img src="img/profile2.jpg">
            <p id="namecard">Lea Johnson</p>
            <p id="work">Baker</p>
            <a href="">Contact</a>
        </div>
        <div class="card2">
            <img src="img/profile3.jfif">
            <p id="namecard">John Wood</p>
            <p id="work">Baker</p>
            <a href="">Contact</a>
        </div>
        <br><br><br><br><br><br><br>
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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </body>
</html>

<?php 
}else{
     header("Location: index.php");
     exit();
}
 ?>