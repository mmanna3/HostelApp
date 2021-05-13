using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class CamaCuchetaDeArriba : Cama
    {
        public override CamaTipoEnum Tipo()
        {
            return CamaTipoEnum.CuchetaArriba;
        }
    }
}
