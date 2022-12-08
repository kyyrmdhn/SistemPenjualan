var table;
var cartTable;

$(document).ready(function () {
    table = $('#tableProductUser').DataTable({
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
                data: "id",
                visible: false,
                searchable: false
            },
            {
                data: "productPic",
                render: function (data, type, row, meta) {
                    var imgsrc = 'data:image/png;base64,' + data;
                    return '<img class="img-responsive" src="' + imgsrc + '" height="100px" width="100px">';
                },
                searchable: false
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
                render: function (data, type, row, meta) {
                    return `
                    <button type="button" class="btn btn-primary" onclick="detailProd('${data.id}')" data-bs-toggle="modal" data-bs-target="#detailModal">Detail</button>
                    <button type="button" class="btn btn-primary btncart">Add to Cart</button>`;
                }
            }
        ]
    });

    cartTable = $('#cart').DataTable({
        stateSave: true,        
        searching: false, 	//remove search box
        paging: false, 		//remove paging 
        info: false, 			//remove 1 of x entries

        columnDefs: [
            {
                orderable: false, targets: [0, 2, 3, 4, 5, 6]
            },
            {
                targets: [0],
                visible: false,
                searchable: false
            },    
            {
                targets: [4],
                render: function (data) {
                    return 'Rp ' + data;
                }
            },
            {
                targets: [5],
                render: function (data) {
                    return 'Rp ' + data;
                }
            },
        ],
        footerCallback: function (row, data, start, end, display) {

            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over all pages
            var total = api
                .column(4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(0).footer()).html('');
            $(api.column(1).footer()).html('');
            $(api.column(2).footer()).html('');
            $(api.column(3).footer()).html('');
            $(api.column(4).footer()).html('');
            $(api.column(5).footer()).html('<div class="a_checkout_outer"> Rp ' + Number(total).toFixed(2) + '</div>');
            $(api.column(6).footer()).html('<div class="a_checkout_outer"><button id="purchaseButton" class="a_checkout btn btn-primary">Checkout</button></div>');

        }
    });

    cartTable.column(0).visible(false);

    $('#tableProductUser tbody').on('click', '.btncart', function () {
        var data = table.row($(this).parents('tr')).data();
        var imgsrc = 'data:image/png;base64,' + data.productPic;
        var productImg = '<img class="img-responsive" src="' + imgsrc + '" height="50px" width="50px">';
        var buttons = '<button class="btn btn-primary">-</button> <button class="btn btn-primary">+</button> <button class="btn btn-primary btnDelete"><i class="fa fa-trash fa-1x red" aria-hidden="true"></i></button>';

        cartTable.row.add([data.id, productImg, data.name, 1, data.price, data.price, buttons]).draw(false);
    });

    $('#cart tbody').on('click', '.btnDelete', function () {		//remove the row
        var row = cartTable.row($(this).parents('tr'));
        row.remove();
        cartTable.draw();
    });

    $('#cart tfoot').on('click', 'button', function () {

        var table = $('#cart').DataTable();
        
        checkoutDetail();

        function checkoutDetail() {
            var cartTable = table.rows().data();
            var modalData = "";
            var totalAmount = 0;

            if (cartTable.length > 0) {

                $('#checkoutModal').modal('show');

                cartTable.each(function (value, index) {
                    modalData += `
                    <tr>
                        <td>${value[1]}</td>
                        <td>${value[2]}</td>
                        <td>${value[3]}</td>
                        <td>Rp ${value[4]}</td>
                        <td>Rp ${value[5]}</td>
                    <tr>`

                    totalAmount += value[5];                    
                });
                var footerData = `
                    <h4>Total Amount: </h4>
                    <h4>Rp ${totalAmount}</h4>`;

                $('#checkoutBody').html(modalData);
                $('#totalAmount').html(footerData);
            }
        } 
        
    });	

    $('#confirmBtn').on('click', function () {

    })

});


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
