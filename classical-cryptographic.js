// ================== Caesar Cipher ==================

function encryptCaesar() {
  const plaintextInput = document.getElementById('caesarPlaintext').value.toUpperCase();
  const shiftInput = document.getElementById('caesarKey').value;
  const shift = parseInt(shiftInput);
  const errorElement = document.getElementById('caesarError');

  // Ẩn thông báo lỗi
  errorElement.style.display = 'none';
  errorElement.textContent = '';

  // Kiểm tra văn bản nguồn và khóa
  if (!shiftInput) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập khóa.';
    errorElement.style.display = 'block';
    return;
  }

  if(!plaintextInput) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập văn bản nguồn.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(plaintextInput)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Văn bản nguồn chỉ được chứa các ký tự chữ cái và khoảng trắng.';
    errorElement.style.display = 'block';
    return;
  }

  if (isNaN(shift) || shift < 0 || shift > 25) {

    errorElement.innerHTML = '<strong>Lỗi:</strong> Khóa K phải là một số nguyên từ 0 đến 25.';
    errorElement.style.display = 'block';
    return;
  }
  
  const encodedAlphabet = createEncodedAlphabet(shift);
  document.getElementById('caesarCiphertext').value = caesarCipher(plaintextInput, shift);

  const encodedAlphabetElement = document.getElementById('encodedAlphabet');
  encodedAlphabetElement.textContent = encodedAlphabet;
}

function createEncodedAlphabet(shift) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let encodedAlphabet = '';

  for (let i = 0; i < alphabet.length; i++) {
    const currentIndex = i;
    const shiftedIndex = (currentIndex + shift) % alphabet.length;
    encodedAlphabet += alphabet[shiftedIndex] + ' '; // Thêm khoảng cách sau mỗi ký tự
  }

  return encodedAlphabet.trim(); // Loại bỏ khoảng cách thừa ở cuối chuỗi
}

function caesarCipher(text, shift) {
  // Kiểm tra shift hợp lệ
  shift = parseInt(shift);
  if (isNaN(shift) || shift < 0 || shift > 25) {
    return 'Khóa K không hợp lệ (phải là một số nguyên từ 0 đến 25)';
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text[i].toUpperCase();
    if (alphabet.includes(char)) {
      let index = alphabet.indexOf(char);
      char = alphabet[(index + shift) % 26];
    } else {
      char = text[i];
    }
    result += char;
  }

  return result;
}
// ================== Monoalphabetic Cipher ==================

function isValidMonoKey(key) {
  // Kiểm tra xem khóa có hợp lệ hay không
  if (key.length !== 26) return false; // Độ dài khóa phải là 26
  const set = new Set(key); // Tạo một tập hợp từ khóa
  if (set.size !== 26) return false; // Không có ký tự trùng lặp
  return true;
}

function encryptMonoalphabetic() {
  const plaintext = document.getElementById('monoPlaintext').value;
  const key = document.getElementById('monoKey').value;
  const errorElement = document.getElementById('monoError');

  // Ẩn thông báo lỗi
  errorElement.style.display = 'none';
  errorElement.textContent = '';

  // Kiểm tra văn bản nguồn và khóa

  if (!plaintext) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập văn bản nguồn.';
    errorElement.style.display = 'block';
    return;
  }

  if (!key) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập khóa.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(plaintext)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Văn bản nguồn chỉ được chứa các ký tự chữ cái và khoảng trắng.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z]+$/.test(key)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Khóa chỉ được chứa các ký tự chữ cái.';
    errorElement.style.display = 'block';
    return;
  }

  if (!isValidMonoKey(key)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Khóa phải chứa đủ 26 ký tự không trùng lặp.';
    errorElement.style.display = 'block';
    return;
  }

  const ciphertext = monoalphabeticCipher(plaintext, key);
  document.getElementById('monoCiphertext').value = ciphertext;

  const encodedAlphabet = key.split('').join(' ');
  document.getElementById('monoEncodedAlphabet').textContent = encodedAlphabet;
}



function monoalphabeticCipher(text, key) {
    text = text.toUpperCase();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keyMap = new Map();

    // Tạo bảng ánh xạ từ ký tự chữ cái sang ký tự trong khóa
    for (let i = 0; i < alphabet.length; i++) {
        keyMap.set(alphabet[i], key[i]);
    }

    // Thay thế các ký tự chữ cái bằng ký tự tương ứng trong khóa
    const result = text.replace(/[A-Z]/g, (currentChar) =>
        keyMap.get(currentChar) || currentChar
    );

    return result;
}

// ================== Vigenere Cipher ==================

function encryptVigenere() {
  const plaintext = document.getElementById('vigenerePlaintext').value;
  const key = document.getElementById('vigenereKey').value;
  const errorElement = document.getElementById('vigenereError');

  // Ẩn thông báo lỗi
  errorElement.style.display = 'none';
  errorElement.textContent = '';

  // Kiểm tra văn bản nguồn và khóa

  if (!plaintext) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập văn bản nguồn.';
    errorElement.style.display = 'block';
    return;
  }

  if (!key) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập khóa.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(plaintext)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Văn bản nguồn chỉ được chứa các ký tự chữ cái và khoảng trắng.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z]+$/.test(key)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Khóa chỉ được chứa các ký tự chữ cái.';
    errorElement.style.display = 'block';
    return;
  }

  const ciphertext = vigenereCipher(plaintext, key);
  document.getElementById('vigenereCiphertext').value = ciphertext;

  const keyTable = createKeyTable(key);
  document.getElementById('vigenereKeyTable').innerHTML = keyTable;
}

function createKeyTable(key) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let keyTable = '';

  for (let i = 0; i < alphabet.length; i++) {
    let row = alphabet[i] + ': ';
    for (let j = 0; j < alphabet.length; j++) {
      const shiftedIndex = (j + i) % alphabet.length;
      row += alphabet[shiftedIndex];
    }
    keyTable += row + '\n';
  }

  return keyTable;
}

function vigenereCipher(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    text = text.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let j = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (alphabet.includes(char)) {
            let keyChar = key[j % key.length];
            let shift = alphabet.indexOf(keyChar);
            let index = alphabet.indexOf(char);
            char = alphabet[(index + shift) % 26];
            j++;
        }
        result += char;
    }

    return result;
}

// ================== Playfair Cipher ==================
function encryptPlayfair() {
  const plaintext = document.getElementById('playfairPlaintext').value;
  const key = document.getElementById('playfairKey').value;
  const ciphertextElement = document.getElementById('playfairCiphertext');
  const keyTableElement = document.getElementById('playfairKeyTable');
  const errorElement = document.getElementById('playfairError');

  errorElement.style.display = 'none';
  errorElement.textContent = '';

  // Xóa dữ liệu cũ trong bảng
  keyTableElement.innerHTML = '';

  // Kiểm tra khóa và văn bản nguồn
  if (!key) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập khóa.';
    errorElement.style.display = 'block';
    return;
  }

  if (!plaintext) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập văn bản nguồn.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z]+$/.test(key)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Khóa chỉ được chứa các ký tự chữ cái.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(plaintext)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Văn bản nguồn chỉ được chứa các ký tự chữ cái và khoảng trắng.';
    errorElement.style.display = 'block';
    return;
  }

  const matrix = createPlayfairTable(key);
  const ciphertext = playfairCipher(plaintext, key);

  // Tạo bảng mới
  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered');

  // Tạo các hàng và cột cho bảng
  for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('td');
      cell.textContent = matrix[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Thêm bảng vào phần tử HTML
  keyTableElement.appendChild(table);

  // In ra văn bản mã hóa
  ciphertextElement.value = ciphertext;
}

// Tạo bảng Playfair từ khóa
function createPlayfairTable(key) {
  const table = [];
  const keyString = key.replace(/[^a-z]/gi, '').toUpperCase();
  const characters = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('');

  // Thêm các ký tự khác nhau trong khóa vào bảng
  for (let i = 0; i < keyString.length; i++) {
    const char = keyString[i];
    if (!table.includes(char)) {
      table.push(char);
    }
  }

  // Thêm các ký tự còn lại vào bảng
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    if (!table.includes(char)) {
      table.push(char);
    }
  }

  // Tạo mảng 2 chiều từ bảng
  const matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(table.slice(i * 5, i * 5 + 5));
  }

  // In ra ma trận
  console.log("Ma trận Playfair từ khóa:", key);
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join(' '));
  }

  return matrix;
}

function playfairCipher(plaintext, key) {
  const table = createPlayfairTable(key);
  let ciphertext = '';

  // Xử lý chuỗi plaintext
  plaintext = plaintext.replace(/[^a-z]/gi, '').toUpperCase();
  for (let i = 0; i < plaintext.length; i += 2) {
    let char1 = plaintext[i];
    let char2 = (i === plaintext.length - 1) ? 'X' : plaintext[i + 1];

    // Xử lý cặp ký tự giống nhau
    if (char1 === char2) {
      char2 = 'X';
      plaintext = plaintext.slice(0, i + 1) + 'X' + plaintext.slice(i + 1);
    }

    const pos1 = findPosition(table, char1);
    const pos2 = findPosition(table, char2);

    if (pos1.row === pos2.row) {
      const newChar1 = table[pos1.row][(pos1.col + 1) % 5];
      const newChar2 = table[pos2.row][(pos2.col + 1) % 5];
      ciphertext += newChar1 + newChar2;
    } else if (pos1.col === pos2.col) {
      const newChar1 = table[(pos1.row + 1) % 5][pos1.col];
      const newChar2 = table[(pos2.row + 1) % 5][pos2.col];
      ciphertext += newChar1 + newChar2;
    } else {
      const newChar1 = table[pos1.row][pos2.col];
      const newChar2 = table[pos2.row][pos1.col];
      ciphertext += newChar1 + newChar2;
    }
  }

  return ciphertext;
}
// Tìm vị trí của một ký tự trong bảng Playfair
function findPosition(table, char) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (table[row][col] === char) {
        return { row, col };
      }
    }
  }
  return { row: -1, col: -1 };
}
  
// ================== One-time Pad Cipher ==================

function encryptOnetimePad() {
  const plaintext = document.getElementById('onetimePadPlaintext').value;
  const key = document.getElementById('onetimePadKey').value;
  const errorElement = document.getElementById('onetimePadError');

  // Ẩn thông báo lỗi
  errorElement.style.display = 'none';
  errorElement.innerHTML = '';

  // Kiểm tra văn bản nguồn và khóa
  if (!plaintext) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập văn bản nguồn.';
    errorElement.style.display = 'block';
    return;
  }

  if (!key) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập khóa.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z]+$/.test(key)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Khóa chỉ được chứa các ký tự chữ cái.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(plaintext)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Văn bản nguồn chỉ được chứa các ký tự chữ cái và khoảng trắng.';
    errorElement.style.display = 'block';
    return;
  }

  if (key.length < plaintext.length) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Khóa phải có độ dài tối thiểu bằng văn bản nguồn.';
    errorElement.style.display = 'block';
    return;
  }

  const ciphertext = onetimePadCipher(plaintext, key);
  document.getElementById('onetimePadCiphertext').value = ciphertext;
}

function onetimePadCipher(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    text = text.replace(/[^A-Z]/gi, '').toUpperCase();
    key = key.replace(/[^A-Z]/gi, '').toUpperCase();
    let result = '';

    for (let i = 0, j = 0; i < text.length; i++, j = (j + 1) % key.length) {
        const plainChar = text[i];
        const keyChar = key[j];
        const plainIndex = alphabet.indexOf(plainChar);
        const keyIndex = alphabet.indexOf(keyChar);
        const cipherIndex = (plainIndex + keyIndex) % 26;
        result += alphabet[cipherIndex];
    }

    return result;
}

// ================== Railfence Cipher ==================

function encryptRailfence() {
  const plaintext = document.getElementById('railfencePlaintext').value;
  const key = parseInt(document.getElementById('railfenceKey').value);
  const errorElement = document.getElementById('railfenceError');

  // Ẩn thông báo lỗi
  errorElement.style.display = 'none';
  errorElement.innerHTML = '';

  // Kiểm tra văn bản nguồn và khóa
  if (!plaintext) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập văn bản nguồn.';
    errorElement.style.display = 'block';
    return;
  }

  if (!key) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Vui lòng nhập số rail hợp lệ.';
    errorElement.style.display = 'block';
    return;
  }

  if (key < 2) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Rail phải là số nguyên lớn hơn hoặc bằng 2.';
    errorElement.style.display = 'block';
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(plaintext)) {
    errorElement.innerHTML = '<strong>Lỗi:</strong> Văn bản nguồn chỉ được chứa các ký tự chữ cái và khoảng trắng.';
    errorElement.style.display = 'block';
    return;
  }

  const ciphertext = railfenceCipher(plaintext, key);
  document.getElementById('railfenceCiphertext').value = ciphertext;

}

function railfenceCipher(text, key, decrypt = false) {
  const rails = new Array(key).fill('');
  let dir = 1;
  let row = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] !== ' ') {
      rails[row] += text[i];
    }
    row += dir;
    if (row === key - 1 || row === 0) {
      dir *= -1;
    }
  }

  let result = '';
  if (decrypt) {
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ') {
        const pos = rails.findIndex((rail) => rail.includes(text[i]));
        result += rails[pos][0];
        rails[pos] = rails[pos].slice(1);
      } else {
        result += ' ';
      }
    }
  } else {
    result = rails.join('');
  }

  return result;
}
