export const obocreateusermail = `<!DOCTYPE html>
<html>
<head>
   <title>Dim Institute</title>
</head>
<style>
    body{
    background-color: white;
    margin-top: 20%;
    margin-left: 40%;
    margin-right: 40%;
}
.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  
  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  
  /* Add some padding inside the card container */
  .container {
    padding: 2px 16px;
  }
  .button{
     margin-left: 12%;
     margin-top: 2%;
     margin-bottom: 2%;
     display: block;
     height: 60px;
     width: 75%;
  border-radius: 25px;
  outline: none;
  border: none;
  background-size: 100%;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  transition: .5s;
     background-color: darkviolet;
     

  }
  @media screen and (max-width:1150px){
      body{
        margin-left: 35%;
        margin-right: 35%;
        margin-top: 25%;
      }
    } 
    @media screen and (max-width:950px){
      body{
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 30%;
      }
    } 
    @media screen and (max-width:750px){
      body{
        margin-left: 25%;
        margin-right: 25%;
        margin-top: 40%;
      }
    } 
    @media screen and (max-width:550px){
      body{
        margin-left: 20%;
        margin-right: 20%;
        margin-top: 55%;
      }
    } 
    @media screen and (max-width:350px){
      body{
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 85%;
      }
    } 
 
</style>
<body>
    <div class="card">
      <br/>
        <h3 style="text-align: center;">Welcome to DIM Institute!</h3>
        <hr/>
        <div class="container">
         <p style="text-align: center;">Email : {{email}}</p>
	<p style="text-align: center;">Password : {{password}}</p>
	<p style="text-align: center;">Kindly change the password after first login!</p>
         <br/>
        </div>
      </div>
</body>
</html>`;
