class Utilities {



  startUp() {
    document.getElementById("table").style.visibility = "visible";
    document.getElementById("MemBox").style.visibility = "visible";
    document.getElementById("MemBox").appendChild(document.getElementById("table"));
  }


}

export default Utilities;