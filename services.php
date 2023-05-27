

<?php 
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])) {

 ?>

<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="style_services.css">
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
        <h2 id="slogan1">CRIS CAKES</h2>
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
            <h2>Order</h2>
        </div>
        <div class="form">
            <h3>Complete this form to make your order:</h3>
            <form action="order.php" method="post">
        <div class="txt_field">
         <div class="txt_field">
                    <input type="text" name="name" id="name" required>
                    <span></span>
                    <label for="name">Name</label>
                </div>
          
          <div class="txt_field">
                    <input type="text" name="telephone"  id="name" required>
			<label for="telephone">Telephone</label>
                </div>
          
			
			<select class="cakeType" name="cakeType" id="cakeType" >
			<label for="cakeType" >Cake type:</label>
				<option value="0" selected="selected"></option>
				<option value="25">Chocolate Cake</option>
				<option value="24">Red Velvet Cake</option>
				<option value="22">Carrot Cake</option>
				<option value="26">Genoise Cake</option>
				<option value="20">Angel Food Cake</option>
			</select>
    
            <h5>Toppings:</h5>
			Chocolate chips<input type="checkbox" name="topping[]" value="2">
			whipped cream<input type="checkbox" name="topping[]" value="2">
			fruits<input type="checkbox" name="topping[]" value="3">
			marzipan<input type="checkbox" name="topping[]" value="4"><br>

        <h5>Size:</h5>
			20 cm<input type="radio" name="size" value="1" checked="checked">
			26 cm<input type="radio" name="size" value="2">
			30 cm<input type="radio" name="size" value="3">

			<input type="text" name="quantity" placeholder="quantity">

			<input type="submit" value="Place Order">
                
                
            </form>
        </div>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <div class="footer-basic">
        <footer>
            <div class="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a></div>
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
 
