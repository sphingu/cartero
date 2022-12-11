export const Header = () => {
  return (
    <header class="ui fixed inverted menu">
      <div class="ui container">
        <p class="header item">
          <img class="logo" src="/src/assets/postman.png" />
          CARTERO
        </p>
        <a href="/" class="item blue">
          Home
        </a>
        <div class="right menu">
          <div class="item">
            <div class="ui icon input">
              <input type="text" placeholder="Search..." />
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
