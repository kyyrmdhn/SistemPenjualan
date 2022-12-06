//$(document).ready(function () {
$('#tableProduct').DataTable({
    ajax: {
        url: '',
        type: 'GET',
        dataType: 'json'
    },
    columns: [
        {
            data: null,
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: 'pic'
        },
        {
            data: "name"
        },
        {
            data: "price"
        },
        {
            data: null,
            render: function (data, type, row, meta) {
                return `
                        <button type="button" id="detailButton" class="btn btn-primary" onclick="detailDept('${data.id}')" data-toggle="modal" data-target="#detailModal">Edit</button> |
                        <button type="button" id="deleteButton" class="btn btn btn-danger" data-toggle="modal" data-id="${data.id}" data-target="#deleteDeptModal">Delete</button>`
            }
        }
    ],
    dom: 'Bfrtip'
});
});