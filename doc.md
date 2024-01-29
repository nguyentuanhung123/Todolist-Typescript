### Bài học rút ra ở bài 110

* Chạy terminal ở git bash chung sẽ nhanh hơn khi chạy ở terminal project đó
* Thực hành bằng Git Bash chung
* Khi ta đang ở thư mục con nào đó mà muốn vào thư mục cha thì ta phải : cd ..
-> Vào được folder tổng (reactjs)
* Xem danh sách trong folder tổng : ls
* Cập nhật vào 1 folder trong đó : cd <Project_Name>/\
* Muốn tạo 1 project bằng typescript ta sử dụng : npx create-react-app my-app --template typescript (chạy trong Git Bash Here ở thư mục reactjs sẽ nhanh hơn khi chạy trong visual)
* Phải refresh lại nếu nó có quá nhiều (thực hiện trong studio - nêu có)
* Tải thêm sass : npm i sass
* Thêm : npm i prettier eslint-plugin-prettier eslint-config-prettier -D (Dùng để format code)

### Tạo 1 file trong project vừa tạo : .editorconfig
-> Thêm :
[*]
indent_style = space
indent_size = 2

### Tạo 1 file trong project vừa tạo : .prettierrc
-> Thêm :
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}

### Tạo 1 file trong project vừa tạo : .eslintrc
{
  "extends": ["react-app", "prettier"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "always",
        "semi": false,
        "trailingComma": "none",
        "tabWidth": 2,
        "endOfLine": "auto",
        "useTabs": false,
        "singleQuote": true,
        "printWidth": 120,
        "jsxSingleQuote": true
      }
    ]
  }
}

### Mở file package.json , bổ sung ở script (dưới eject)
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint --ext js,jsx,ts,tsx src/",
    "lint:fix": "eslint --fix --ext js,jsx,ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*.jsx|*.js|*.tsx|*ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.jsx|*.js|*.tsx|*ts|*.css|*.scss)\""
  },


### Lúc này bạn chỉ cần chạy

- `npm run lint`: Kiểm tra lỗi eslint
- `npm run lint:fix`: Fix lỗi liên quan eslint (đôi lúc có những lỗi bạn phải tự fix bằng tay)
- `npm run prettier`: Kiểm tra lỗi prettier format
- `npm run prettier:fix`: Tự fix lỗi prettier format


### 4.7. Thêm file `.prettierrignore` và `.eslintignore` để ignore những file bạn không muốn prettier và eslint format

- Comment thì dùng `#`
- Ignore file: `example.exe`
- Ignore cả thư mục: `folder/`, tất nhiên là bạn dùng `folder` cũng được nhưng nên thêm `/` để phân biệt với file
- Phủ định thì thêm `!`: `!folder/file.exe`
- Ignore tất cả các file có đuôi là `.exe`: `*.exe`
- Ignore tất cả các file có tên bắt đầu là log: `log*`
- Ignore tất cả các file có đuôi là `.exe` ở theo đường dẫn `folder/file.exe` (các file ở đường dẫn `folder/sub/file.exe` sẽ không bị ignore): `folder/**.exe`
- Ignore tất cả các file có đuôi là `.exe` ở thư mục `folder` dù cho có nằm ở sub-folder đi chăng nữa: `folder/**/**.exe`
- Ignore mọi thứ bên trong thư mục folder: `folder/**`

### Các bước tiếp theo thực hiện nếu muốn
B1 : Xoá file App.css
B2 : Tạo file app.module.scss trong src
B3 : Thêm css bất kỳ : .app{}
B4 : import styles from './app.module.scss' trong App.tsx
B5 : Sử dụng class bằng cách : className={styles.app}

### Bài học rút ra ở bài 115 (Đồng bộ hóa React và local storage)
* setTodos là một hàm nhận một array cũ rồi tạo array mới
* Ta tạo các hàm như handleAdd , handleEdit , ... rồi đặt vào trong setTodos (callback) (setTodos(handler))
* Các hàm handleAdd , handleEdit , ... đều có một đặt điểm chung là nhận một array cũ rồi tạo array mới => tạo 1 prop-type


### Bài học rút ra ở bài 116 (Thêm proptype checking)
* Lưu ý : typescript chỉ chạy khi code , còn proptype chạy run-time(tức là nếu trong code ta sai một chỗ nào đó , thì khi chạy app nó sẽ hiển thị ra một màn hình đen với lỗi)
* Thứ tự đặt 
1. Thư viện
2. Components
3. Scss , css

B1 : npm i prop-types
B2 : import PropTypes from 'prop-types'