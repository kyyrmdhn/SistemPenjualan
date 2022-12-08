let table = null;

$(document).ready(function () {
    table = $('#tableUser').DataTable({
        ajax: {
            url: 'https://localhost:7254/api/User',
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
                },
            },
            {
                data: "address",
                render: (data) => {
                    return data;
                }
            },
            {
                data: "phoneNumber",
                render: (data) => {
                    return data;
                }
            },
            {
                data: "email",
                render: (data) => {
                    return data;
                }
            },
            {
                data: "createdDate",
                render: (data) => {
                    return data;
                }
            }
        ],
        dom: 'Bfrtip',
        buttons: ['colvis', 'copy', 'pdf', 'excel']
    })
})