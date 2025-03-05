sudo apt-get update
wget https://go.dev/dl/go1.23.3.linux-amd64.tar.gz
sudo tar -xvf go1.23.3.linux-amd64.tar.gz
sudo mv go /usr/local
sudo rm -r /usr/local/go
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
source ~/.profile

rm go1.23.3.linux-amd64.tar.gz

GOROOT=/usr/local/go
GOPATH=~/.go
PATH=$PATH:$GOROOT/bin:$GOPATH/bin
