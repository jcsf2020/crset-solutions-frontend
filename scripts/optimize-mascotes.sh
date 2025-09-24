#!/bin/bash
# Script para otimizar imagens das mascotes para WebP
set -euo pipefail

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🖼️  Otimizando imagens das mascotes para WebP${NC}"

# Verificar se o cwebp está disponível
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠️  cwebp não encontrado. A instalar webp...${NC}"
    sudo apt-get update && sudo apt-get install -y webp
fi

# Diretório base das mascotes
MASCOTES_DIR="public/mascotes"
OPTIMIZED_DIR="public/mascotes/optimized"

# Criar diretório otimizado se não existir
mkdir -p "$OPTIMIZED_DIR"

# Função para otimizar uma imagem
optimize_image() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file" .png)
    
    # Criar subdiretório se necessário
    local subdir=$(dirname "$input_file" | sed "s|$MASCOTES_DIR|$output_dir|")
    mkdir -p "$subdir"
    
    echo -e "${YELLOW}📸 Processando: $filename${NC}"
    
    # Gerar diferentes tamanhos
    local sizes=(200 512 1024 1536)
    
    for size in "${sizes[@]}"; do
        local output_file="$subdir/${filename}-w${size}.webp"
        
        # Só processar se o arquivo não existir ou for mais antigo que o original
        if [[ ! -f "$output_file" ]] || [[ "$input_file" -nt "$output_file" ]]; then
            cwebp -q 85 -resize "$size" 0 "$input_file" -o "$output_file"
            echo -e "  ✅ Criado: ${filename}-w${size}.webp"
        else
            echo -e "  ⏭️  Já existe: ${filename}-w${size}.webp"
        fi
    done
}

# Encontrar todas as imagens PNG das mascotes
while IFS= read -r -d '' file; do
    # Pular se já estiver no diretório otimizado
    if [[ "$file" == *"/optimized/"* ]]; then
        continue
    fi
    
    optimize_image "$file" "$OPTIMIZED_DIR"
done < <(find "$MASCOTES_DIR" -name "*.png" -print0)

echo -e "${GREEN}✅ Otimização concluída!${NC}"
echo -e "${YELLOW}📊 Estatísticas:${NC}"

# Mostrar estatísticas de tamanho
original_size=$(find "$MASCOTES_DIR" -name "*.png" -not -path "*/optimized/*" -exec du -ch {} + | tail -1 | cut -f1)
optimized_size=$(find "$OPTIMIZED_DIR" -name "*.webp" -exec du -ch {} + | tail -1 | cut -f1)

echo -e "  📁 Tamanho original (PNG): $original_size"
echo -e "  📁 Tamanho otimizado (WebP): $optimized_size"

# Contar arquivos
original_count=$(find "$MASCOTES_DIR" -name "*.png" -not -path "*/optimized/*" | wc -l)
optimized_count=$(find "$OPTIMIZED_DIR" -name "*.webp" | wc -l)

echo -e "  📄 Arquivos originais: $original_count"
echo -e "  📄 Arquivos otimizados: $optimized_count"

echo -e "${GREEN}🎉 Pronto! As imagens otimizadas estão em $OPTIMIZED_DIR${NC}"
