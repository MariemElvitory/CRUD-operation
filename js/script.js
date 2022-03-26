var productNameIn=document.getElementById("productName");
var productPriceIn=document.getElementById("productPrice");
var productCategoryIn=document.getElementById("productCategory");
var productDescriptionIn=document.getElementById("productDescription");
var mainBtn=document.getElementById("mainBtn");
var productsContainer;
var currentIndex=0;

if (localStorage.getItem("products")==null)
{
    productsContainer=[];
}
else 
{
    productsContainer= JSON.parse (localStorage.getItem("products"));
    displayProduct(productsContainer);
}

function add()
{
    if (mainBtn.innerHTML=="Add Product")
    {
        addproduct()
    }
    else
    {
       editProduct() 
    }
}



function addproduct()        
{

  var product=
    {
        name:productNameIn.value,
        price:productPriceIn.value,
        category:productCategoryIn.value,
        description:productDescriptionIn.value
    }

    productsContainer.push(product);

    localStorage.setItem("products", JSON.stringify(productsContainer));
    console.log(productsContainer);

    displayProduct(productsContainer);
    clearform()  
}




function displayProduct(productsList)   
{ 
    var box=``;

    for (i=0 ; i<productsList.length ;i+=1){
     
    box+=
    ` <tr>
    <td>${i}</td>
    <td>${productsList[i].name}</td>
    <td>${productsList[i].price}</td>
    <td>${productsList[i].category}</td>
    <td>${productsList[i].description}</td>
    <td><button class="update-btn " onclick="updateProduct(${i})">Update</button></td>
    <td><button class="delete-btn" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`
    }
document.getElementById("tableRaw").innerHTML=box;

}


function clearform()
{
    productNameIn.value="";
    productPriceIn.value="";
    productCategoryIn.value="";
    productDescriptionIn.value="";
}



function deleteProduct(productIndex)
{
   productsContainer.splice(productIndex,1)
   localStorage.setItem("products", JSON.stringify(productsContainer));
   displayProduct(productsContainer)
   
}



function searchProducts(term)
{
   
    var searchProducts=[];
    for (var i=0 ; i<productsContainer.length ; i++)
    {
      if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())==true)
      {
          searchProducts.push(productsContainer[i]);
      }
    }
    displayProduct(searchProducts);
}


function updateProduct(index)
{
 
    currentIndex=index;
    productNameIn.value=productsContainer[index].name;
    productPriceIn.value=productsContainer[index].price;
    productCategoryIn.value=productsContainer[index].category;
    productDescriptionIn.value=productsContainer[index].description;

    mainBtn.innerHTML="Update Product"
}

function editProduct() 
{
    productsContainer[currentIndex].name=productNameIn.value;
    productsContainer[currentIndex].price=productPriceIn.value;
    productsContainer[currentIndex].category=productCategoryIn.value;
    productsContainer[currentIndex].description=productDescriptionIn.value;
    mainBtn.innerHTML="Add Product";
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProduct(productsContainer);
    clearform()
}




// function validateProductName()
// {
//    var regex=/^[A-Z][a-z]{3,8}$/;

//    if (regex.test(productNameIn.value))
//     {
//        return true;
//     } 
//   else 
//   {
//       return false;
//   }
// }



