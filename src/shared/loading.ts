import "../../styles/loading.css";

const loading = {
  show(loadingText = "加载中"): void {
    const div: HTMLElement = document.createElement("div");
    div.id = "loading-container";
    div.innerHTML = `
		<div class='loading-container-content'>
            <div class='lds-spinner' style='margin-top: ${
              loadingText ? "-15px" : 0
            }'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p class='loading-text' style='display: ${
              loadingText ? "block" : "none"
            }'>${loadingText}</p>
        </div>
	`;
    const body: HTMLElement = document.getElementsByTagName("body")?.[0];
    body.appendChild(div);
  },
  hide(): void {
    const loadingContainer = document.getElementById("loading-container");
    if (loadingContainer)
      document.getElementsByTagName("body")[0].removeChild(loadingContainer);
  },
};

export default loading;
