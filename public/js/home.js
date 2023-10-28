//Tentar arrumar p/ integrar c/ nosso projeto depois
// ClassicEditor
// .create( document.querySelector( '#editor') )
// .catch( error => {
//     console.error( error );
// } );
// ClassicEditor
// .create( document.querySelector( '#editor1') )
// .catch( error => {
//     console.error( error );
// } );
// ClassicEditor
// .create( document.querySelector( '#editor2') )
// .catch( error => {
//     console.error( error );
// } );
// ClassicEditor
// .create( document.querySelector( '#editor3') )
// .catch( error => {
//     console.error( error );
// } );

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }  

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function logOutUser() {
    dadosUsuario = getCookie("userData")
    dadosEmpresa = getCookie("enterpriseData")

    if(dadosUsuario) {
        deleteCookie("userData")
        window.location.href = "index.html"
    }
    else if (dadosEmpresa) {
        deleteCookie("enterpriseData")
        window.location.href = "loginEmpresa.html"
    }
}