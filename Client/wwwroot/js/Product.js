let table = null;

$(document).ready(function () {
    table = $('#tableProduct').DataTable({
        ajax: {
            url: 'https://localhost:7254/api/Product',
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            {
                data: "name",
                render: (data) => {
                    return data;
                }
            },
            {
                data: "category",
                render: (data) => {
                    return data;
                }
            },
            {
                data: "price",
                render: (data) => {
                    return data;
                }
            },
            {
                data: "id",
                render: (data) => {
                    return `
                    <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProductModal" onclick="editProduct(${data})">Edit</a> |
                    <a class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailProductModal" onclick="showDetail(${data})">Detail</a> |
                    <a class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProductModal" onclick="showDelete(${data})">Delete</a>
                `;
                }
            }
        ],
        dom: 'Bfrtip', "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["colvis", "copy", "csv", "excel", "pdf", "print"]
    })
})

function newProduct() {
    let data;
    let Id = 0;
    let Name = $('#ProductName').val();
    let Category = $('#ProductCategory').val();
    let Price = $('#ProducPrice').val();
    let Description = $('#ProducDescription').val();
    let ProductPic = $('#ProducPic').val();
    let CreatedDate = $('#CreatedDate').val();
    let CategoryId = $('#CategoryId').val();

    data = {
        "id": Id,
        "name": Name,
        "category": Category,
        "price": Price,
        "description": Description,
        "productPic": ProductPic,
        "createdDate": CreatedDate,
        "categoryId": CategoryId
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7254/api/Product',
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            Swal.fire(
                'Done!',
                'Update Data Successfull' + data,
                'Success'
            );
            location.reload();
        }
    });
}

function editProduct(Id) {
    $.ajax({
        url: `https://localhost:7254/api/Product/${Id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";

        $('#edit').html(`
        <input type = "hidden" class= "form-control" id = "hidenId" readonly placeholder = "" value = "0">
        <p> Id: <input type="text" class="form-control" id="Id" readonly placeholder="${res.data.id}" value="${res.data.id}">
        <p> Name: <input type="text" class="form-control" id="ProductName" placeholder="${res.data.name}" value="${res.data.name}">
        <p> Category: <input type="text" class="form-control" id="ProductCategory" placeholder="${res.data.category}" value="${res.data.category}">
        <p> Price: <input type="text" class="form-control" id="ProductPrice" placeholder="${res.data.price}" value="${res.data.price}">
        <p> Description: <input type="text" class="form-control" id="ProductDescription" placeholder="${res.data.description}" value="${res.data.description}">
        <p> Product Picture: <input type="file" class="form-control" id="ProductPic" placeholder="${res.data.productPic}" value="${res.data.productPic}">
        `)
        console.log(res);
    }).fail((err) => {
        console.log(err);
    });
}

function updateProduct() {
    let data;
    let Id = parseInt($('#Id').val());
    let Name = $('#ProducName').val();
    let Category = $('#ProductCategory').val();
    let Price = $('#ProducPrice').val();
    let Description = $('#ProducDescription').val();
    let ProductPic = $('#ProducPic').val();

    data = {
        "id": Id,
        "name": Name,
        "category": Category,
        "price": Price,
        "description": Description,
        "productPic": ProductPic
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7254/api/Product',
        type: "PUT",
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            Swal.fire(
                'Done!',
                'Update Data Successfull',
                'Success'
            )
            location.reload();
        }
    });
}

function showDetail(Id) {
    $.ajax({
        url: `https://localhost:7254/api/Product/${Id}`,
        type: "GET"
    }).done(res => {
        console.log(res)

        let temp = '';

        $('#modalDetail').html(`
        
        <div class=" row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              ID :
          </div>
          <div class="col-8">
               <input class="form-control form-control-sm" type="text" value="${res.data.id}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Nama :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.name}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Category :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.category}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Price :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.price}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Description :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.description}" aria-label="readonly input example" readonly>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-4 text-end text-dark fw-semibold">
              Product Picture :
          </div>
          <div class="col-8 text-capitalize">
              <input class="form-control form-control-sm" type="text" value="${res.data.productPic}" aria-label="readonly input example" readonly>
          </div>
        </div>
    
                `)
    }).fail(err => {
        console.log(err)
    })
}

function showDelete(Id) {
    $.ajax({
        url: `https://localhost:7254/api/Product/${Id}`,
        method: 'DELETE',
        dataType: 'json',
        success: function (data) {
            Swal.fire(
                'Done!',
                'Delete Data Successfull' + data,
                'success'
            );
            location.reload();
        }
    })
}