

$('#click').on('click', () => {
    const place = $('#search').val();
    if (place.length !== "") {
        fetch('weather?address=' + encodeURIComponent(place)).then((res) => {
            res.json().then((data) => {
                if (data.error) return $('#res').text(data.error)
                $('#res').text(data.message + ' in ' + data.location)
            }).catch((error) => $('#res').text(error))
        })
    }
})