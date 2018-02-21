const $addTagBtn = document.querySelector('#addTagBtn');
const $tagInput = document.querySelector('#tagInput');
const $tagsInput = document.querySelector('#tagsInput');

$addTagBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let $tagInputVal = $tagInput.value;
    $tagInput.value = '';
    if($tagInputVal != '' && $tagInputVal != ',' ) {
        $tagsInput.value = $tagsInput.value.replace(/\s/g, "") + ',' + $tagInputVal.replace(/\s/g, "");
    }
    $tagsInput.value = $tagsInput.value[0] == ',' ? $tagsInput.value.substring(1) : $tagsInput.value;
    $tagsInput.value = $tagsInput.value[$tagsInput.value.length - 1] == ',' ? $tagsInput.value.slice(0, -1) : $tagsInput.value;
});

var eventList = ['keydown', 'paste'];
for(event of eventList) {
    $tagsInput.addEventListener(event, function(e) {
        e.preventDefault();
    });
}