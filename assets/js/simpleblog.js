function deleteConfirmation(id) {
	var isDelete = confirm("Apakah Anda yakin menghapus post ini?");
	if (isDelete) {
		window.location.href = "delete.php?id="+id;
	} 
}

function validateEmail() {
	var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var email = document.getElementById("Email").value;
	if (filter.test(email)) {
		return true;
	} else {
		return false;
	}
}

function loadComments() {
	var postID = location.search.split('id=')[1];
	var url = "load_comments.php?id_post="+postID;

	var httpRequest;
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	    httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE 8 and older
	    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}

	httpRequest.onreadystatechange = function(){
	    if (httpRequest.readyState==4 && httpRequest.status==200) {
	    	document.getElementById("comments-area").innerHTML = httpRequest.responseText;
	    };
	};

	httpRequest.open('GET', url);
    httpRequest.send();
}

function addComment() {
	var id_post = encodeURIComponent(document.getElementById("id_post").value);
	var nama = encodeURIComponent(document.getElementById("Nama").value);
	var email = encodeURIComponent(document.getElementById("Email").value);
	var komentar = encodeURIComponent(document.getElementById("Komentar").value);

	if (nama == '' || email == '' || komentar == '' || (!validateEmail(email))) {
		var namavalidation = true;
		var emailvalidation = true;
		var komentarvalidation = true;

		var namaerror = document.getElementById("namaerror");
		var emailerror = document.getElementById("emailerror");
		var komentarerror = document.getElementById("komentarerror");

		if (nama == '') {			
			namaerror.innerHTML = "Nama tidak boleh kosong";
			namavalidation = false;
		} else { namaerror.innerHTML = ""; }
		if (email == '') {
			emailerror.innerHTML = "Email tidak boleh kosong";
			emailvalidation = false;
		} else if (!validateEmail(email)) {
			emailerror.innerHTML = "Email tidak valid";
			emailvalidation = false;
		} else { emailerror.innerHTML = ""; }
		if (komentar == '') {
			komentarerror.innerHTML = "Komentar tidak boleh kosong";
			komentarvalidation = false;
		} else { komentarerror.innerHTML = ""; }

		//focus
		if (!namavalidation) {
			document.getElementById("Nama").focus();
		} else if (!emailvalidation) {
			document.getElementById("Email").focus();
		} else if (!komentarvalidation) {
			document.getElementById("Komentar").focus();
		}

	} else {

		var data = "id_post="+id_post+"&nama="+nama+"&email="+email+"&komentar="+komentar;
		var url = "add_comment.php";

		var httpRequest;
		if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		    httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE 8 and older
		    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}

		httpRequest.onreadystatechange = function(){
		    if (httpRequest.readyState==4 && httpRequest.status==200) {
		    	document.getElementById("Nama").value = '';
				document.getElementById("Email").value = '';
				document.getElementById("Komentar").value = '';
				document.getElementById("namaerror").innerHTML = "";
				document.getElementById("emailerror").innerHTML = "";
				document.getElementById("komentarerror").innerHTML = "";
				
		    	var comments = document.getElementById('comments-area');
				comments.innerHTML = httpRequest.responseText + comments.innerHTML;
		    };
		};

		httpRequest.open('POST', url);
	    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    httpRequest.send(data);
	}

	return false;
}

function validatePost() {
	var judul = document.getElementById("Judul").value;        
	var tanggal = document.getElementById("Tanggal").value;
	var konten = document.getElementById("Konten").value;
	
 	if (judul == "") {
 		alert("Judul tidak boleh kosong");
 		return false;
 	}
 	if (tanggal == "") {
 		alert("Judul tidak boleh kosong");
 		return false;
 	} else {
 		var date = tanggal.split("-");
 		var postDate = new Date(date[2],date[1]-1,date[0]);
 		var today = new Date();

 		var isGreaterThanToday = true;

 		if (postDate.getFullYear() < today.getFullYear()) {
 			isGreaterThanToday = false;
 		} else if (postDate.getMonth() < today.getMonth()) {
 			isGreaterThanToday = false;
 		} else if (postDate.getDate() < today.getDate()) {
 			isGreaterThanToday = false;
 		}

 		if (!isGreaterThanToday) {
 			alert("Tanggal harus lebih besar atau sama dengan tanggal sekarang");
 			return false;
 		}
 	}
 	if (konten == "") {
 		alert("Konten tidak boleh kosong");
 		return false;
 	}


 	return true;
}