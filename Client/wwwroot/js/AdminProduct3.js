let table = null;
getCatId();
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
                data: "stock",
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
                data: null,
                render: function (data, type, row) {
                    return `
                    <a class="btn btn-warning" data-toggle="modal" data-target="#editProductModal" onclick="getForEdit(${data.id})"><i class="fas fa-pencil-alt"></i></a>
                    <a class="btn btn-info" data-toggle="modal" data-target="#detailProductModal" onclick="showDetail(${data.id})"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-danger" onclick="showDelete(${data.id})"><i class="fas fa-trash"></i></a>
                    `
                }
            }
        ],
        dom: 'Bfrtip', "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["colvis", "copy", "csv", "excel", "pdf", "print"]
    })
})

function getCatId() {
    $.ajax({
        url: `https://localhost:7254/api/Category`
    }).done((res) => {
        let category = "";
        $.each(res.data, function (key, val) {
            category += `<option value="${val.id}">${val.name}</option>`
        });
        $("#categoryId").html(category);
        $("#categoryIdEdit").html(category);
    });
}

$(".addProduct").submit(function (e) {
    e.preventDefault()
    let data = new Object;
    data.name = $('#name').val();
    data.stock = $('#stock').val();
    data.price = $('#price').val();
    data.description = $('#description').val();
    data.productPic = $('#producPict');
    data.categoryId = $('#categoryId').val();

    var fd = new FormData();
    var productPic = $('#productPict')[0].files;
    fd.append('name', data.name);
    fd.append('stock', data.stock);
    fd.append('price', data.price);
    fd.append('description', data.description);
    fd.append('productPic', productPic);
    fd.append('categoryId', data.categoryId);
    console.log(fd);
    console.log(productPic);/*
    console.log(data);*/
    $.ajax({
        url: 'https://localhost:7254/api/Product/AddProduct',
        type: "POST",
        //data: JSON.stringify(data),
        data: fd,
        contentType: false,
        processData: false,
        dataType: 'json',
        /*headers: {
            'Content-Type': 'application/json'
        },*/
        success: function (data) {
            Swal.fire(
                'Good job!',
                `${data.message}`,
                'Success'
            );
            location.reload();
        },
        error: function (err) {
            alert(err)
        }
    });
})

function getForEdit(id) {
    getCatId();
    $.ajax({
        type: "GET",
        url: `https://localhost:7254/api/Product/?id=${id}`,
        success: function (result) {
            $.each(result.data, function (key, val) {
                $('#nameEdit').attr('value', `${(val.name)}`)
                $('#stockEdit').attr('value', `${(val.stock)}`)
                $('#priceEdit').attr('value', `${(val.price)}`)
                $('#descriptionEdit').attr('value', `${(val.description)}`)
                $('#productPicEdit').attr('value', `${(val.productPic)}`)
                $('#categoryIdEdit').attr('value', `${(val.categoryId)}`)
                $('#btnEdit').attr('onclick', `updateProduct(${(val.id)})`)
            })
        },
        error: function (err) {
            alert(err)
        }
    })
}


function updateProduct(id) {
    let data = new Object;
    data.id = parseInt(id);
    data.name = $('#nameEdit').val();
    data.stock = $('#stockEdit').val();
    data.price = $('#priceEdit').val();
    data.description = $('#descriptionEdit').val();
    data.productPic = $('#producPicEdit').files;
    data.categoryId = $('#categoryIdEdit').val();

    var fd = new FormData();
    fd.append('name', data.name);
    fd.append('stock', data.stock);
    fd.append('price', data.price);
    fd.append('description', data.description);
    fd.append('productPic', data,productPic);
    fd.append('categoryId', data.categoryId);
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
        },
        error: function (err) {
            alert(err)
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

        $('#detailBody').html(`
        
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

function showDelete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `https://localhost:7254/api/Product/${id}`,
                contentType: "application/json",
                dataType: "json",
                type: "delete",
                success: function (data) {
                    Swal.fire(
                        'Deleted!',
                        `${data.message}`,
                        'success'
                    ).then(function () {
                        location.reload();
                    })
                },
                error: function (err) {
                    alert(err);
                }
            })

        }
    })
}

const productPict = document.querySelector("#productPict");
productPict.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
});