const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var tttt;
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  //var sesion = document.getElementById("sesionU");
  usuario = user.email.split("@", 1);
  //alert(usuario);
  llenar_tabla();
} else {
  //alert("nnnnn")
  llenar_tabla();
}
});
//window.onload=llenar_tabla();
var i = 0;
function llenar_tabla(){
  var queryE = db.collection("Entregas");
  /*queryE
  .get().then(function(doc) {
    //if (doc.exists) {
  var i = 0;
    while(typeof (doc.docs[i]) != "undefined"){
      if(typeof(doc.docs[i].data()["Enlace"]) != "undefined"){
      var queryR = db.collection("Recojos").where("idos","==",doc.docs[i].data()["idos"]).where("Enlace","==",doc.docs[i].data()["Enlace"]);
      llenar_tabla_programacion(doc.docs[i], queryR, i);
      ;}
      i++;
      }}).catch(function(error) {
          console.log("Error getting document:", error);
      });*/

    queryE.onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    if(typeof(change.doc.data()["Enlace"]) != "undefined" && typeof(change.doc.data()["idos"]) != "undefined"){
                    var queryR = db.collection("Recojos").where("idos","==",change.doc.data()["idos"]).where("Enlace","==",change.doc.data()["Enlace"]);
                    llenar_tabla_programacion(change.doc, queryR,i);
                    ;}
                }
                if (change.type === "modified") {
                  var num = indexRow("tabla_datos",change.doc.id);
                  if(num!=-1){
                    if (document.getElementById("tabla_datos").rows[num].id==change.doc.id){
                      document.getElementById("tabla_datos").deleteRow(num);
                    }
                  }
                  if(typeof(change.doc.data()["Enlace"]) != "undefined"){
                  var queryR = db.collection("Recojos").where("idos","==",change.doc.data()["idos"]).where("Enlace","==",change.doc.data()["Enlace"]);
                  llenar_tabla_programacion(change.doc, queryR,i);

                  ;}
                    console.log("Modified city: ", change.doc.data());
                }
                if (change.type === "removed") {
                  //document.getElementById("tabla_datos").deleteRow(indexRow("tabla_datos",change.doc.id));
                  /*if(typeof(change.doc.data()["Enlace"]) != "undefined"){
                  var queryR = db.collection("Recojos").where("idos","==",change.doc.data()["idos"]).where("Enlace","==",change.doc.data()["Enlace"]);
                  llenar_tabla_programacion(change.doc, queryR,i);
                  ;}*/
                    console.log("Removed city: ", change.doc.data());
                }
            });
        });
}

function indexRow(tabla,id){
  var index = -1;
  var rows = document.getElementById(tabla).rows;
  for (var i=0;i<rows.length; i++){
      if ( rows[i].id == id ){
          index = i;
          break;
        }
      }
  return index;
}


function llenar_tabla_programacion(envioD, recojos, i){
  recojos.get().then(function(docR){
    var k=0;
    while(typeof(docR.docs[k]) != "undefined"){
      if(docR.docs[k].data()["idstatus"] == "SINPROGRAMAR" || envioD.data()["idstatus"]=="SINPROGRAMAR"){
        /*document.getElementById("tabla_datos").innerHTML+="<tr id='"+envioD.id+"'>"+
        "<td>"+docR.docs[k].data()["idos"]+"</td>"+
        "<td>"+docR.docs[k].data()["idfechaprogramadaR"]+"</td>"+
        "<td>"+envioD.data()["idfechaprogramadaE"]+"</td>"+
        "<td>"+docR.docs[k].data()["idorigenR"]+"</td>"+
        "<td>"+envioD.data()["iddireccionentrega"]+"</td>"+
        "<td>"+envioD.data()["idcontactoentrega"]+"</td>"+
        "<td>"+docR.docs[k].data()["idcanttipoR"]+"</td>"+
        "<td>"+docR.docs[k].data()["idpesoR"]+"</td>"+
        "<td>"+envioD.data()["idcanttipoE"]+"</td>"+
        "<td>"+envioD.data()["idpesoE"]+"</td>"+
        "<td>"+docR.docs[k].data()["idstatus"]+"-"+envioD.data()["idstatus"]+"</td>"+
        "<td>"+envioD.data()["idobsE"]+"</td>"+
        "<td>"+"<button id='boton_ubicacion"+(i+k)+"' onclick='AbrirProgramacion_2(\"Recojos@@"+docR.docs[k].id+"\", \"Entregas@@"+envioD.id+"\")' style='height:100%; width:100%; background:#0B4F8F; color:white'>Llenar</button>"+"</td>"+
        "</tr>";
      */

      var table = document.getElementById("tabla_datos");

// Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(k+1);
      row.id=envioD.id;

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      var cell8 = row.insertCell(7);
      var cell9 = row.insertCell(8);
      var cell10 = row.insertCell(9);
      var cell11 = row.insertCell(10);
      var cell12 = row.insertCell(11);
      var cell13 = row.insertCell(12);
      var cell14 = row.insertCell(13);



// Add some text to the new cells:
      var fechaE = new Date(envioD.data()["idfechaprogramadaE"]);
      var fechaR = new Date(docR.docs[k].data()["idfechaprogramadaR"]);

      cell1.innerHTML = "....";
      cell2.innerHTML = fechaR.getDate()+"/"+(fechaR.getMonth()+1)+"/"+fechaR.getFullYear();
      cell3.innerHTML = fechaE.getDate()+"/"+(fechaE.getMonth()+1)+"/"+fechaE.getFullYear();
      cell4.innerHTML = "....";
      cell5.innerHTML = "....";
      cell6.innerHTML = docR.docs[k].data()["idorigenR"];
      cell7.innerHTML = "....";
      cell8.innerHTML = envioD.data()["idcontactoentrega"];
      cell9.innerHTML = "....";
      cell10.innerHTML = "....";
      cell11.innerHTML = "....";
      cell12.innerHTML = "....";
      cell13.innerHTML = "....";
      cell14.innerHTML = "....";
    }
        k++;
    }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  })
}
