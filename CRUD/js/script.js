var action
var row_
var temp_user
const modal_name = document.querySelector('#exampleModalLabel')
var datatable = $('#table_id').DataTable({
    "ajax": "php/get_data.php",
    "columns": [{
            "data": "Username"
        },
        {
            "data": "Password"
        },
        {
            "data": "Name"
        },
        {
            "data": "action"
        },
    ],
})

async function save_data() {

    let all_input_box = document.querySelectorAll(".modal-body input")
    let username = all_input_box[1].value
    let password = all_input_box[2].value
    let name = all_input_box[0].value
    let array_temp = new Array()
    if (action == 'new') {

        datatable.rows().every(function(rowIdx, tableLoop, rowLoop) {
            let data = this.data().Username;
            array_temp.push(data)
        })

        if (array_temp.includes(username)) {
            swal(
                'Sorry!',
                'Username already used.',
                'error'
            )
        } else {

            fetch("./php/data_insert.php", {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        password,
                        name
                    })
                })
                .then(res => res.text())
                .then(res => {

                    if (res == 1) {
                        datatable.row.add({
                            "Username": username,
                            "Password": password,
                            "Name": name,
                            "action": "<button type='button' onclick = 'edit_data(this)' class='btn btn-sm' data-bs-toggle='modal' data-bs-target='#exampleModal' > <i class='fas fa-edit'></i></button><button type='button' onclick ='deleteitem(this)'class='btn btn-sm'><i class='fas fa-trash-alt'></i></button>"
                        }).draw();
                        $('#exampleModal').modal('hide')
                        swal(
                            'Succes!',
                            'Successfuly save data',
                            'success'
                        )
                    } else {
                        swal(
                            'Error',
                            res,
                            'error'
                        )
                    }


                })
                .catch(err => {

                    swal(
                        'Error',
                        err,
                        'error'
                    )
                })



        }


    } else {

        fetch("./php/data_update.php", {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    name
                })
            })
            .then(res => res.text())
            .then(res => {

                if (res == 1) {
                    datatable.row(row_).data({
                        "Username": username,
                        "Password": password,
                        "Name": name,
                        "action": "<button type='button' onclick = 'edit_data(this)' class='btn btn-sm' data-bs-toggle='modal' data-bs-target='#exampleModal' > <i class='fas fa-edit'></i></button><button type='button' onclick ='deleteitem(this)'class='btn btn-sm'><i class='fas fa-trash-alt'></i></button>"
                    }).draw();
                    $('#exampleModal').modal('hide')
                    swal(
                        'Succes!',
                        'Successfuly save data',
                        'success'
                    )
                } else {
                    swal(
                        'Error',
                        res,
                        'error'
                    )
                }


            })
            .catch(err => {

                swal(
                    'Error',
                    err,
                    'error'
                )
            })


    }

}

function openmodal() {
    modal_name.innerText = 'Create New'
    let all_input_box = [...document.querySelectorAll(".modal-body input")]
    $('#exampleModal').modal('show')
    all_input_box.forEach((x, i) => {
        x.value = ''
        if (i == 1) x.disabled = false
    })
    action = 'new'
}

function edit_data(val) {

    modal_name.innerText = 'Edit/Update'
    let all_data_row = [...val.parentElement.parentElement.children].filter((x, i, arr) => {
        return i != arr.length - 1
    }).map(x => x.innerText)
    let all_input_box = document.querySelectorAll(".modal-body input")
    action = 'edit'

    all_input_box[0].value = all_data_row[2] // name
    all_input_box[1].value = all_data_row[0] // username
    all_input_box[2].value = all_data_row[1] // password
    all_input_box[1].disabled = true
    datatable.rows().every(function(rowIdx, tableLoop, rowLoop) {
        let data = this.data().Username;

        data == all_data_row[0] ? row_ = rowIdx : ''

    })
    temp_user = all_data_row[0]
}

function deleteitem(val) {

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(result => {
        if (result.value) {
            let all_data_row = [...val.parentElement.parentElement.children].filter((x, i, arr) => {
                return i != arr.length - 1
            }).map(x => x.innerText)
            let index = 0
            let username = all_data_row[0]
            datatable.rows().every(function(rowIdx, tableLoop, rowLoop) {
                let data = this.data().Username;

                data == all_data_row[0] ? index = rowIdx : ''

            })
            fetch("./php/data_delete.php", {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                    })
                })
                .then(res => res.text())
                .then(res => {
                    if (res == 1) {
                        datatable.row(index)
                            .remove()
                            .draw();
                        swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    } else {
                        swal(
                            'Error',
                            res,
                            'error'
                        )
                    }
                })
                .catch(err => {

                    swal(
                        'Error',
                        err,
                        'error'
                    )
                })

        } else {
            swal(
                'Cancelled',
                'This data will not be remove',
                'error'
            )

        }

    })


}