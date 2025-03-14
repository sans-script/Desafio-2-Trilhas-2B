function updateFileInfo(inputId, infoDivId) {
  const input = document.getElementById(inputId);
  const fileInfoDiv = document.getElementById(infoDivId);
  fileInfoDiv.innerHTML = "";

  if (!input.files.length) return;

  const file = input.files[0];
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const isTooLarge = fileSizeMB > 2;

  fileInfoDiv.innerHTML = `
      ${
        isTooLarge
          ? `<img src="/assets/alert-circle.svg" alt="Erro Icon" class="w-5 h-5 mr-2">`
          : ""
      }
      <span class="${
        isTooLarge ? "text-red-600" : "text-secondary"
      } font-normal text-[14px]">
        ${
          isTooLarge
            ? `Oops! ${file.name} (${fileSizeMB}MB) é muito grande! Máximo: 2MB 😅`
            : `Arquivo selecionado: ${file.name} (${fileSizeMB} MB)`
        }
      </span>`;

  if (isTooLarge) input.value = "";
}

// Chamadas específicas para cada tipo de arquivo
function updateIdFile() {
  updateFileInfo("documento", "file-info-identidade");
}

function updateResidenceProofFile() {
  updateFileInfo("comprovante", "file-info-comprovante");
}

document.querySelectorAll(".customCheckbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(".customCheckbox");
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
        updateCheckboxUI(otherCheckbox);
      }
    });
    updateCheckboxUI(checkbox);
  });
});

function updateCheckboxUI(checkbox) {
  const wrapper = checkbox.closest(".checkboxWrapper");
  const uncheckedIcon = wrapper.querySelector(".uncheckedIcon");
  const checkedIcon = wrapper.querySelector(".checkedIcon");

  if (checkbox.checked) {
    uncheckedIcon.classList.add("hidden");
    checkedIcon.classList.remove("hidden");
    wrapper.classList.remove("border-stroke-default");
    wrapper.classList.add("border-brand-dark");
  } else {
    uncheckedIcon.classList.remove("hidden");
    checkedIcon.classList.add("hidden");
    wrapper.classList.remove("border-brand-dark");
    wrapper.classList.add("border-stroke-default");
  }
}



const singleCheckbox = document.getElementById("customCheckbox");
const singleWrapper = document.getElementById("checkboxWrapper");
const singleUncheckedIcon = document.getElementById("uncheckedIcon");
const singleCheckedIcon = document.getElementById("checkedIcon");

// Inicializa o estado do SVG baseado no checkbox
updateSingleCheckboxUI();

// Escuta o clique no wrapper do checkbox
singleWrapper.addEventListener("click", () => {
    singleCheckbox.checked = !singleCheckbox.checked;
    updateSingleCheckboxUI();
});

// Atualiza os SVGs com base no estado do checkbox
function updateSingleCheckboxUI() {
    if (singleCheckbox.checked) {
        singleUncheckedIcon.classList.add("hidden");
        singleCheckedIcon.classList.remove("hidden");
    } else {
        singleUncheckedIcon.classList.remove("hidden");
        singleCheckedIcon.classList.add("hidden");
    }
}
