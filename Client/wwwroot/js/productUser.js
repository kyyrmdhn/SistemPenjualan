$(document).ready(function () {
    $('#tableProductUser').DataTable({
        ajax: {
            url: 'https://localhost:7254/api/Product',
            type: 'GET',
            dataType: 'json'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },            
            {
                data: "productPic",
                render: function (data, type, row, meta) {
                    var imgsrc = 'data:image/png;base64,' + data;
                    return '<img class="img-responsive" src="' + imgsrc + '" height="100px" width="100px">';
                },     
            },
            {
                data: "name",                
            },
            {
                data: "categoryId",               
            },
            {
                data: "stock",               
            },
            {
                data: "price",
                render: function (data, type, row, meta) {
                    return `Rp ${data}`;
                },               
            },
            {
                data: null,
                render: function (data, type, row, meta){
                    return `
                    <button type="button" class="btn btn-primary" onclick="detailProd('${data.id}')" data-bs-toggle="modal" data-bs-target="#detailModal">Detail</button>
                    <button type="button" id="addButton" class="btn btn-primary">Add to Cart</button>`;
                }
            }
        ]
    })
})


function detailProd(Id) {
    $.ajax({
        url: `https://localhost:7254/api/Product/${Id}`,
        type: "GET"
    }).done(res => {

        let imgsrc = 'data:image/png;base64,' + res.data.productPic;

        let tempDetail = `
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <img src="${imgsrc}" height="350px" width="350px class="img border border-dark">
                        </div>            
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1>${res.data.name}</h1>
                        </div>
                    </div>
                    <div class="row">
                        <h2 class="col">
                          Rp ${res.data.price}
                        </h2>
                    </div>
                    <div class="btn btn-primary btn-lg btn-flat">
                        Add to Cart
                    </div>
                    <div class="row">
                        <nav class="w-100">
                          <div class="nav nav-tabs" id="product-tab" role="tablist">
                            <a class="nav-item nav-link active" id="product-desc-tab" data-toggle="tab" href="#product-desc" role="tab" aria-controls="product-desc" aria-selected="true">Description</a>
                          </div>
                        </nav>
                        <div class="tab-content p-3" id="nav-tabContent">
                          <div class="tab-pane fade show active" id="product-desc" role="tabpanel" aria-labelledby="product-desc-tab">${res.data.description}</div>
                        </div>
                    </div>
                </div>

                `;
        $('#detailBody').html(tempDetail);        
    }).fail(err => {
        console.log(err)
    })
}
