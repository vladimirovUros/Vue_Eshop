<template>
    <div id="contact-page" class="container">
    	<div class="bg">
	    	<div class="row">    		
	    		<div class="col-sm-12">    			   			
					<h2 class="title text-center">Contact <strong>Us</strong></h2>    			    				    				
				</div>			 		
			</div>    	
    		<div class="row">  	
	    		<div class="col-sm-8">
	    			<div class="contact-form">
	    				<h2 class="title text-center">Get In Touch</h2>
	    				<div class="status alert alert-success" style="display: none"></div>
				    	<form id="main-contact-form" class="contact-form row" name="contact-form" method="">
							<ValidationProvider name="Name" rules="required|min:5" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="name" placeholder="Name" v-model="name"/>
							</ValidationProvider>
							<ValidationProvider name="Email" rules="emailRegex" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="email" placeholder="Email" v-model="name"/>
							</ValidationProvider>
							<ValidationProvider name="Subject" rules="required|min:5" v-slot="{ errors }">
								<TextInput :error="errors[0]" id="subject" placeholder="Subject" v-model="name"/>
							</ValidationProvider> 
							<ValidationProvider name="Message" rules="required|min:5" v-slot="{ errors }">
								<TextInput :multiline="true" rowCount="10" :error="errors[0]" id="message" placeholder="Message" v-model="name"/>
							</ValidationProvider>               
				            <div class="form-group col-md-12">
				                <input type="submit" name="submit" class="btn btn-primary pull-right" value="Submit">
				            </div>
				        </form>
	    			</div>
	    		</div>
	    		<div class="col-sm-4">
	    			<div class="contact-info">
	    				<h2 class="title text-center">Contact Info</h2>
	    				<address>
	    					<p>E-Shopper Inc.</p>
							<p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
							<p>Newyork USA</p>
							<p>Mobile: +2346 17 38 93</p>
							<p>Fax: 1-714-252-0026</p>
							<p>Email: info@e-shopper.com</p>
	    				</address>
	    				<div class="social-networks">
	    					<h2 class="title text-center">Social Networking</h2>
							<ul>
								<li>
									<a href="#"><i class="fa fa-facebook"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-twitter"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-google-plus"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-youtube"></i></a>
								</li>
							</ul>
	    				</div>
	    			</div>
    			</div>    			
	    	</div>  
    	</div>	
    </div><!--/#contact-page-->
 </template>
 <script>
 export default {
     name: 'ContactComponent',
	 mounted() {
		let Script = document.createElement("script");
		Script.setAttribute("src", "assets/js/jquery.js");
		document.head.appendChild(Script);
		setTimeout(function(){
		let Script2 = document.createElement("script");
		Script2.setAttribute("src", "assets/js/contact.js");
		document.head.appendChild(Script2);
		}, 50);
	 }
 }
 </script>