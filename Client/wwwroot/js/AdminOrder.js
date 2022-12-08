(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

let url = `https://localhost:7254/api/Order`
let table = "";
$(document).ready(function () {
    table = $('#tableOrder').DataTable({
        ajax: {
            url: url,
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            {
                data: "orderDate",
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button class="btn btn-default" data-toggle="modal" data-target="#modalUserDetail" onclick="getUserDetail(${data.userId})">Detail</button>`
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button class="btn btn-default" data-toggle="modal" data-target="#modalOrderDetail" onclick="getOrderDetail(${data.id})">Detail</button>`
                }
            },
            {
                data: "paymentStatus",
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button class="btn btn-default" data-toggle="modal" data-target="#modalDeliveryDetail" onclick="getDeliveryDetail(${data.id})">Detail</button>`
                }
            },
            {
                data: "receivedStatus",
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button class="btn btn-default" data-toggle="modal" data-target="#modal-edit" onclick="getForUpdate(${data.id})">Edit</button>`
                }
            }
        ],
        dom: 'Bfrtip', "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["colvis", "copy", "csv", "excel", "pdf", "print"]
    });
})

function getOrderDetail(Id) {
    let detail = {};

    $.ajax({
        url: `https://localhost:7254/api/OrderDetail/${Id}`,
        type: "GET"
    }).done(res => {
        console.log(res)

        let temp = '';

        $('#modalOrderDetailx').html(`
        
        <div class=" row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Quantity :
          </div>
          <div class="col-8">
               <input class="form-control form-control-sm" type="text" value="${res.data.qty}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Total Price :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.totalPrice}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Product Id :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.productId}" aria-label="readonly input example" readonly>
          </div>
        </div>
    
                `)
    }).fail(err => {
        console.log(err)
    })
}

function getUserDetail(Id) {
    let detail = {};

    $.ajax({
        url: `https://localhost:7254/api/User/${Id}`,
        type: "GET"
    }).done(res => {
        console.log(res)

        let temp = '';

        $('#modalUserDetailx').html(`
        
        <div class=" row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Id :
          </div>
          <div class="col-8">
               <input class="form-control form-control-sm" type="text" value="${res.data.id}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Name :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.name}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Address :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.address}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Phone Number :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.phoneNumber}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Email :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.email}" aria-label="readonly input example" readonly>
          </div>
        </div>
    
                `)
    }).fail(err => {
        console.log(err)
    })
}

function getDeliveryDetail(Id) {
    let detail = {};

    $.ajax({
        url: `https://localhost:7254/api/DeliveryOrder/${Id}`,
        type: "GET"
    }).done(res => {
        console.log(res)

        let temp = '';

        $('#modalDeliveryDetailx').html(`
        
        <div class=" row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Id :
          </div>
          <div class="col-8">
               <input class="form-control form-control-sm" type="text" value="${res.data.id}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class=" row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Delivery Date :
          </div>
          <div class="col-8">
               <input class="form-control form-control-sm" type="text" value="${res.data.deliveryDate}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class=" row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Status :
          </div>
          <div class="col-8">
               <input class="form-control form-control-sm" type="text" value="${res.data.status}" aria-label="readonly input example" readonly>
          </div>
        </div>
    
                `)
    }).fail(err => {
        console.log(err)
    })
}

function getForUpdate(Id) {
    $.ajax({
        type: "GET",
        url: `https://localhost:7254/api/DeliveryOrder/${Id}`,
        success: function (result) {
            $.each(result.data, function (key, val) {
                $('#statusEdit').attr('value', `${(val.status)}`)
                $('#btnEdit').attr('onclick', `edit(${(val.id)})`)
            })
        },
        error: function (err) {
            alert(err)
        }
    })
}

function edit() {
    let category = new Object;
    category.id = id
    category.status = $('#statusEdit').val();

    $.ajax({
        url: `https://localhost:7254/api/DeliveryOrder`,
        contentType: "application/json",
        dataType: "json",
        type: "put",
        data: JSON.stringify(category),
        success: function () {
            Swal.fire(
                "Done!",
                `Successfully`,
                "success"
            ).then(function () {
                location.reload();
            })
        },
        error: function (message) {
            console.log(message);
            alert(err.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.Message,
            })
        }
    })
}
