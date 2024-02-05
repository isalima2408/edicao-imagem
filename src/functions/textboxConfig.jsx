import { fabric } from "fabric"

export function textboxConfig() {

    // alterando a lógica do 'padding' padrão da biblioteca fabric para proporcionar
    // aplicação de cor de fundo em toda a caixa de texto, e não apenas na linha.
    fabric.Text.prototype.set({
        _getNonTransformedDimensions() { // Object dimensions
        return new fabric.Point(this.width, this.height).scalarAdd(this.padding)
        },
        _calculateCurrentDimensions() { // Controls dimensions
        return fabric.util.transformPoint(this._getTransformedDimensions(), this.getViewportTransform(), true)
        }
    })

    // modificando limitador de linhas da tecla 'espaço' para 'enter'. Agora, cada 'enter' pula a linha.
    fabric.Textbox.prototype._wordJoiners = /[]/

    // Para que a ação anterior ocorra durante a edição
    function fitTextboxToContent(text) {
        const textLinesMaxWidth = text.textLines.reduce((max, _, i) => Math.max(max, text.getLineWidth(i)), 0)
        text.set({width: textLinesMaxWidth})
    }

    // Adicionar bordas arredondadas a caixa de texto através do atributo 'bgCornerRadius'
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2
        if (h < 2 * r) r = h / 2
        this.beginPath()
        this.moveTo(x+r, y)
        this.arcTo(x+w, y,   x+w, y+h, r)
        this.arcTo(x+w, y+h, x,   y+h, r)
        this.arcTo(x,   y+h, x,   y,   r)
        this.arcTo(x,   y,   x+w, y,   r)
        this.closePath()
        return this
    }
    
    fabric.Textbox.prototype._renderBackground = function(ctx) {
        if (!this.backgroundColor) {
            return
        }
        var dim = this._getNonTransformedDimensions()
        ctx.fillStyle = this.backgroundColor

        if(!this.bgCornerRadius) {
            ctx.fillRect(
                -dim.x / 2,
                -dim.y / 2,
                dim.x,
                dim.y
        );
        } else {
            ctx.roundRect(-dim.x / 2, -dim.y / 2, dim.x, dim.y, this.bgCornerRadius).fill()
        }
        // if there is background color no other shadows
        // should be casted
        this._removeShadow(ctx)
    }
}
