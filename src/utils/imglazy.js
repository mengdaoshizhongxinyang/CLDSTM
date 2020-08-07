let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            !entry.target.isLoaded && showImg(entry.target, entry.dataSrc)
        }
    })
})
function showImg(el, imgSrc) {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        el.src = imgSrc;
        el.isLoaded = true;
    }
}
export default {
    inserted(el,binding){
        el.src='/default.png'
        el.dataSrc=binding.value
        observer.observe(el)
    },
    unbind(){
        observer.disconnect()
    }
}