<?php
	$id_post = $_GET['id_post'];
	include('db_connect.php');
	$query = "SELECT * FROM komentar WHERE id_post='".$id_post."' ORDER BY tanggal DESC";	
	$result = mysql_query($query);              
	
	$listofcomments = '';
	while($komentar = mysql_fetch_array($result)) {
		$listofcomments = $listofcomments . '<li class="art-list-item"><div class="art-list-item-title-and-time"><h2 class="art-list-title"><a href="#">'.$komentar['nama'].'</a></h2><div class="art-list-time">'.$komentar['tanggal'].'</div></div><p>'.$komentar['komentar'].'</p></li>';
	}	
	echo $listofcomments;	
?>