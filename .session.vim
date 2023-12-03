let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Source/ethereum-course
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +8 ~/Source/ethereum-course/ballot/package.json
badd +36 ~/Source/ethereum-course/ballot/contracts/Lottery.sol
badd +1 ~/Source/ethereum-course/inbox/contracts/Inbox.sol
badd +23 ~/Source/ethereum-course/ballot/compile.js
badd +29 ~/Source/ethereum-course/ballot/deploy.js
badd +105 ~/Source/ethereum-course/ballot/test/Lottery.test.js
badd +13 ~/Source/ethereum-course/lottery-react/package.json
badd +1 ~/Source/ethereum-course/lottery-react/public/index.html
badd +16 ~/Source/ethereum-course/inbox/package.json
badd +1 ~/Source/ethereum-course/lottery-react/src/index.js
badd +27 ~/Source/ethereum-course/lottery-react/src/App.js
badd +3 ~/Source/ethereum-course/lottery-react/src/web3.js
badd +74 ~/Source/ethereum-course/lottery-react/src/lottery.js
badd +24 ~/Source/ethereum-course/.gitignore
badd +35 ~/Source/ethereum-course/campaign/contracts/Campaign.sol
argglobal
%argdel
edit ~/Source/ethereum-course/campaign/contracts/Campaign.sol
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal nofen
let s:l = 9 - ((8 * winheight(0) + 35) / 71)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 9
normal! 018|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
