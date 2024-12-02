function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function GenerateResult() {
    const Result = document.createElement('div');
    Result.classList.add('Result');

    const Header = document.createElement('a');
    Header.classList.add('Header');
    Header.textContent = 'Wikipedia';
    Header.href = "https://wikipedia.org";

    const SubText = document.createElement('p');
    SubText.textContent = 'https://wikipedia.org';

    Result.appendChild(Header);
    Result.appendChild(SubText);

    document.body.appendChild(Result);
}

document.addEventListener('DOMContentLoaded', () => {
    const Searchbar = document.getElementById("Searchbar");
    const Loader = document.getElementById("Loader");

    sleep(6000).then(() => {
        Loader.style.display = "none";

        GenerateResult();
    });
});