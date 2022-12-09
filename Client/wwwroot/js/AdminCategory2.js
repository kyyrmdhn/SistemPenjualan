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

let url = `https://localhost:7254/api/Category`
let table = "";
$(document).ready(function () {
    table = $('#tableCategory').DataTable({
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
                data: "name",
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<a class="btn btn-default" data-toggle="modal" data-target="#modal-edit" onclick="getForUpdate(${data.id})"><i class="fas fa-pencil-alt"></i></a>
                        <a class="btn btn-danger" onclick="deleteCategory(${data.id})"><i class="fas fa-trash"></a>`
                }
            }
        ],
        dom: 'Bfrtip', "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["colvis", "copy", "csv", "excel", "pdf", "print"]
    });
})

$(".addCategory").submit(function (e) {
    e.preventDefault()
    let add = {};
    add.name = $("#nameCategory").val();

    $.ajax({
        url: url + '/createData',
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(add),
        dataType: "json",
        success: function () {
            Swal.fire(
                "Done!",
                `Successfully`,
                "success"
            ).then(function () {
                location.reload();
            })
        },
        error: function (err) {
            alert(err);
        }
    })
})

function getForUpdate(id) {
    $.ajax({
        type: "GET",
        url: url + `?id=${id}`,
        success: function (result) {
            $.each(result.data, function (key, val) {
                $('#nameEdit').attr('value', `${(val.name)}`)
                $('#btnEdit').attr('onclick', `edit(${(val.id)})`)
            })
        },
        error: function (err) {
            alert(err)
        }
    })
}

function edit(id) {
    let category = new Object;
    category.id = id
    category.name = $('#nameEdit').val();

    /*Swal.fire(
        'Data Category Updated!',
        'Successfully',
        'success'
    )*/

    $.ajax({
        url: url + '/updateData',
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

function deleteCategory(id) {
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
                url: url + `?id=${id}`,
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