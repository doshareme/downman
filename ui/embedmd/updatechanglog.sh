mkdir -p '.'$(grep -oP '(?=/).*' <<< $1)
cp template/docs.md '.'$(grep -oP '(?=/).*' <<< $1)/$(echo $2'.md')
mkdir -p '.'$(grep -oP '(?=/).*' <<< $1)'/output'
echo '' > '.'$(grep -oP '(?=/).*' <<< $1)'/output/CHANGELOG.md'
changelog-from-release -r https://github.com/$1 -e v$2 > '.'$(grep -oP '(?=/).*' <<< $1)'/output/CHANGELOG.md'
embedmd -w '.'$(grep -oP '(?=/).*' <<< $1)'/'$(echo $2'.md')