$('#click').on('click', () => {
    const place = $('#search').val();
    if (place.length !== "") {
        forecastAndRenderThePage(place)
    }
})

$('#search').keyup((event) => {
    if(event.keyCode == 13) {
        const place = $('#search').val();
        if (place.length !== "") {
            forecastAndRenderThePage(place)
        }
    }
})


const forecastAndRenderThePage = (place) => {
    fetch('weather?address=' + encodeURIComponent(place)).then((res) => {
        res.json().then((data) => {
            if (data.error) return $('#res').text(data.error)
            $('#res').text(data.message + ' in ' + data.location)
        }).catch((error) => $('#res').text(error))
    })
}