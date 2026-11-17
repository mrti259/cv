{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  languages.javascript = {
    enable = true;
    pnpm.enable = true;
  };

  scripts = {
    dev.exec = "pnpm --dir $DEVENV_ROOT/cv dev";
    build.exec = "pnpm --dir $DEVENV_ROOT/cv build";
    preview.exec = "pnpm --dir $DEVENV_ROOT/cv preview";
    format.exec = "pnpm --dir $DEVENV_ROOT/cv format";
  };
}
