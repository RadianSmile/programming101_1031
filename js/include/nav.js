document.write(
'<style type="text/css">\
.headroom {position: fixed;top: 0;left: 0;right: 0;transition: all .6s ease-in-out;}\
.headroom--unpinned {top: -48px;}\
.headroom--pinned {top: 0;}\
</style>'
);

document.write('<nav class="navbar navbar-default navbar-fixed-top headroom " role="navigation">\
		<div class="container-fluid">\
				<a class="navbar-brand" href="index.html">PROGRAMING 101</a>\
\
				<ul class="nav navbar-nav">\
						<li id="nav-user-block"><a href="dashboard.html"><span class="glyphicon glyphicon-user"></span></a></li>   <!--RN-->\
						<li><a href="notification.html" id="bell"><span class="glyphicon glyphicon-bell"></span></a></li>\
		<!--li><a href="review.html">Grading</a></li-->\
		<li><a href="#">Student List</a></li>\
		<li><a tabindex="-1" data-toggle="modal" href="schedule.html" data-target=".bs-example-modal-lg">Schedule</a></li>\
				</ul>\
\
				<ul class="nav navbar-nav navbar-right">\
		<li><a href="#">Help</a></li>\
		<li><a id="logout" >Logout</a></li>\
				</ul>\
		</div>\
</nav>');