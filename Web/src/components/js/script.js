$.ajax({
  type : "POST",
  url : "localhost:4000",
  contentType : "application/json",
  dataType : "json",
  data: { nombre: "lfna23", lugar: "Nowhere" },
  success : function(data) {
    alert("success");
  },
  error : function (xhr) {
  }
  });
