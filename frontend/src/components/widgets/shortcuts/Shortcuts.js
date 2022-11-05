import React from "react";
import "./ShortCuts.css"

const Shortcuts = () => {
  return (
        <div className="widget stick-widget">
          <h4 className="widget-title">Shortcuts</h4>
          <ul className="naves">
            <li>
            <svg viewBox="0 0 384 512"><path d="M320 64c-8.844 0-16 7.156-16 16S311.2 96 320 96c17.64 0 32 14.34 32 32v320c0 17.66-14.36 32-32 32H64c-17.64 0-32-14.34-32-32V128c0-17.66 14.36-32 32-32c8.844 0 16-7.156 16-16S72.84 64 64 64C28.7 64 0 92.72 0 128v320c0 35.28 28.7 64 64 64h256c35.3 0 64-28.72 64-64V128C384 92.72 355.3 64 320 64zM112 128h160C280.8 128 288 120.8 288 112S280.8 96 272 96h-24.88C252.6 86.55 256 75.72 256 64c0-35.35-28.65-64-64-64S128 28.65 128 64c0 11.72 3.379 22.55 8.877 32H112C103.2 96 96 103.2 96 112S103.2 128 112 128zM192 32c17.64 0 32 14.36 32 32s-14.36 32-32 32S160 81.64 160 64S174.4 32 192 32zM84.69 299.3l64 64C151.8 366.4 155.9 368 160 368s8.188-1.562 11.31-4.688l128-128c6.25-6.25 6.25-16.38 0-22.62s-16.38-6.25-22.62 0L160 329.4L107.3 276.7c-6.25-6.25-16.38-6.25-22.62 0S78.44 293.1 84.69 299.3z"/></svg>
                          <a href="https://www.google.com" title="">
                News feed
              </a>
            </li>
            <li>
            <svg viewBox="0 0 512 512"><path d="M508.3 304.9l-61.25-248.7C443.5 42 430.7 31.1 416 31.1H96c-14.69 0-27.47 10-31.03 24.25L3.715 304.9C1.248 314.9 0 325.2 0 335.5v96.47c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-96.47C512 325.2 510.8 314.9 508.3 304.9zM96 64h319.1l55.18 224H368c-6.062 0-11.59 3.438-14.31 8.844L326.1 352H185.9L158.3 296.8C155.6 291.4 150.1 288 144 288H40.84L96 64zM480 432c0 8.822-7.178 16-16 16h-416C39.18 448 32 440.8 32 432v-96.47C32 330.3 33.04 325.2 33.88 320h100.2l27.58 55.16C164.4 380.6 169.9 384 176 384h160c6.062 0 11.59-3.438 14.31-8.844L377.9 320h100.2C478.1 325.2 480 330.3 480 335.5V432z"/></svg>
              <a href="https://www.google.com" title="">
                Inbox
              </a>
            </li>
            <li>
            <svg viewBox="0 0 384 512"><path d="M365.3 125.3l-106.5-106.5C246.7 6.742 230.5 0 213.5 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.35 28.65 64 64 64H320c35.35 0 64-28.65 64-64v-277.5C384 153.5 377.3 137.3 365.3 125.3zM342.6 147.9C346.1 151.3 348.4 155.5 349.9 160H240C231.2 160 224 152.8 224 144V34.08c4.477 1.566 8.666 3.846 12.12 7.299L342.6 147.9zM352 448c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h128v112C192 170.5 213.5 192 240 192H352V448z"/></svg>
              <a href="https://www.google.com" title="">
                My pages
              </a>
            </li>
            <li>
            <svg viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336h101.3C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480z"/></svg>
              <a href="https://www.google.com" title="">
                friends
              </a>
            </li>
            <li>
            <svg viewBox="0 0 512 512"><path d="M324.9 157.8c-11.38-17.38-39.89-17.31-51.23-.0625L200.5 268.5L184.1 245.9C172.7 229.1 145.9 229.9 134.4 245.9l-64.52 89.16c-6.797 9.406-7.75 21.72-2.547 32C72.53 377.5 83.05 384 94.75 384h322.5c11.41 0 21.8-6.281 27.14-16.38c5.312-10 4.734-22.09-1.516-31.56L324.9 157.8zM95.8 352l62.39-87.38l29.91 41.34C191.2 310.2 196.4 313.2 201.4 312.6c5.25-.125 10.12-2.781 13.02-7.188l83.83-129.9L415 352H95.8zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM480 416c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h384c17.64 0 32 14.36 32 32V416zM144 192C170.5 192 192 170.5 192 144S170.5 96 144 96S96 117.5 96 144S117.5 192 144 192zM144 128c8.822 0 15.1 7.178 15.1 16S152.8 160 144 160S128 152.8 128 144S135.2 128 144 128z"/></svg>
              <a href="https://www.google.com" title="">
                images
              </a>
            </li>
            <li>
            <svg viewBox="0 0 576 512"><path d="M558.8 99.64c-10.59-5.484-23.37-4.76-33.15 2.099l-102.8 72.04c-7.25 5.062-9 15.05-3.938 22.28C423.1 203.3 433.9 205 441.2 200L544 128v255.9L441.2 312c-7.266-5.047-17.22-3.312-22.28 3.938c-5.062 7.234-3.312 17.22 3.938 22.28l102.8 71.98c5.5 3.844 11.94 5.786 18.38 5.786c5.047 0 10.12-1.203 14.78-3.625C569.4 406.8 576 395.1 576 383.1V128C576 116 569.4 105.2 558.8 99.64zM320 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128C384 92.65 355.3 64 320 64zM352 384c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V128c0-17.64 14.36-32 32-32h256c17.64 0 32 14.36 32 32V384z"/></svg>
              <a href="https://www.google.com" title="">
                videos
              </a>
            </li>
            <li>
            <svg viewBox="0 0 512 512"><path d="M335.1 232C349.3 232 360 221.3 360 208s-10.71-24-24.04-24C322.7 184 312 194.7 312 208S322.7 232 335.1 232zM175.1 232C189.3 232 200 221.3 200 208S189.3 184 175.1 184C162.7 184 152 194.7 152 208S162.7 232 175.1 232zM346.2 325.7C323.8 352.6 290.9 367.9 256 367.9s-67.79-15.34-90.2-42.22c-5.691-6.75-15.76-7.594-22.54-1.969c-6.781 5.75-7.72 15.72-2.029 22.47C169.6 380.3 211.6 399.1 256 399.1s86.35-19.63 114.8-53.76c5.691-6.875 4.833-16.97-1.948-22.47C361.1 318.1 351.9 318.1 346.2 325.7zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480z"/></svg>
              <a href="messages.html" title="">
                Messages
              </a>
            </li>
            <li>
            <svg viewBox="0 0 448 512"><path d="M207.1 16C207.1 7.164 215.2 0 223.1 0C232.8 0 240 7.164 240 16V32.79C320.9 40.82 384 109 384 192V221.1C384 264.8 401.4 306.7 432.3 337.7L435 340.4C443.3 348.7 448 359.1 448 371.7C448 396.2 428.2 416 403.7 416H44.28C19.83 416 0 396.2 0 371.7C0 359.1 4.666 348.7 12.97 340.4L15.72 337.7C46.63 306.7 64 264.8 64 221.1V192C64 109 127.1 40.82 208 32.79L207.1 16zM223.1 64C153.3 64 95.1 121.3 95.1 192V221.1C95.1 273.3 75.26 323.4 38.35 360.3L35.6 363C33.29 365.3 31.1 368.5 31.1 371.7C31.1 378.5 37.5 384 44.28 384H403.7C410.5 384 416 378.5 416 371.7C416 368.5 414.7 365.3 412.4 363L409.7 360.3C372.7 323.4 352 273.3 352 221.1V192C352 121.3 294.7 64 223.1 64H223.1zM223.1 480C237.9 480 249.8 471.1 254.2 458.7C257.1 450.3 266.3 445.1 274.6 448.9C282.9 451.9 287.3 461 284.4 469.3C275.6 494.2 251.9 512 223.1 512C196.1 512 172.4 494.2 163.6 469.3C160.7 461 165.1 451.9 173.4 448.9C181.7 445.1 190.9 450.3 193.8 458.7C198.2 471.1 210.1 480 223.1 480z"/></svg>
              <a href="https://www.google.com" title="">
                Notifications
              </a>
            </li>
            <li>
            <svg viewBox="0 0 448 512"><path d="M368 320c-25.52 0-47.99 12.18-62.64 30.79L156.1 276.6C158.8 269.1 160 263.2 160 256S158.8 242 156.1 235.4l148.4-74.19C320 179.8 342.5 192 368 192C412.2 192 448 156.2 448 112S412.2 32 368 32S288 67.82 288 112c0 7.17 1.246 13.99 3.016 20.6L142.6 206.8C127.1 188.2 105.5 176 80 176C35.82 176 0 211.8 0 256s35.82 80 80 80c25.52 0 47.99-12.18 62.64-30.79l148.4 74.19C289.2 386 288 392.8 288 400c0 44.18 35.82 80 80 80s80-35.82 80-80S412.2 320 368 320zM368 64C394.5 64 416 85.53 416 112S394.5 160 368 160S320 138.5 320 112S341.5 64 368 64zM80 304C53.53 304 32 282.5 32 256s21.53-48 48-48S128 229.5 128 256S106.5 304 80 304zM368 448c-26.47 0-48-21.53-48-48s21.53-48 48-48s48 21.53 48 48S394.5 448 368 448z"/></svg>
              <a href="https://www.google.com" title="">
                People Nearby
              </a>
            </li>
            <li>
            <svg viewBox="0 0 512 512"><path d="M496 448h-416C53.53 448 32 426.5 32 400v-352C32 39.16 24.84 32 16 32S0 39.16 0 48v352C0 444.1 35.88 480 80 480h416c8.844 0 16-7.156 16-16S504.8 448 496 448zM212.7 299.3c6.25 6.25 16.38 6.25 22.62 0L320 214.6L425.4 320h-89.37C327.2 320 320 327.2 320 336s7.157 16 16 16H464c8.844 0 16-7.156 16-16v-128C480 199.2 472.8 192 464 192S448 199.2 448 208v89.38l-116.7-116.7c-6.25-6.25-16.38-6.25-22.62 0L224 265.4L123.3 164.7c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62L212.7 299.3z"/></svg>
              <a href="https://www.google.com" title="">
                insights
              </a>
            </li>
            <li>
            <svg viewBox="0 0 512 512"><path d="M359.4 57.25c-7.875-4.094-17.52-1.031-21.58 6.781c-4.078 7.844-1.047 17.5 6.797 21.59C408.4 118.9 448 184.2 448 256c0 105.9-86.13 192-192 192s-192-86.13-192-192c0-71.84 39.63-137.1 103.4-170.4c7.844-4.094 10.88-13.75 6.797-21.59C170.1 56.22 160.4 53.16 152.6 57.25C78.22 96.03 32 172.2 32 256c0 123.5 100.5 224 224 224s224-100.5 224-224C480 172.2 433.8 96.03 359.4 57.25zM255.1 288C264.8 288 272 280.8 272 272v-256c0-8.844-7.156-16-15.1-16S240 7.156 240 16v256C240 280.8 247.2 288 255.1 288z"/></svg>
              <a href="https://www.google.com" title="">
                Logout
              </a>
            </li>
          </ul>
        </div>
  );
};

export default Shortcuts;