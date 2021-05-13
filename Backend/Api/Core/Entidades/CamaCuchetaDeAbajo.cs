using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class CamaCuchetaDeAbajo : Cama
    {
        public override CamaTipoEnum Tipo()
        {
            return CamaTipoEnum.CuchetaAbajo;
        }
    }
}
