const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "resident",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "الأسم",
      },

      father_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "اسم الأب",
      },
      family_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "الشهرة",
      },
      mother_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "اسم الأم",
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "تاريخ الميلاد",
      },
      sex: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "الجنس",
      },

      record_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "رقم السجل",
      },
      
      record_place: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "مكان السجل",
      },
      Kadaa: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "القضاء",
      },
      mohafaza: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "المحافظة",
      },
     a_mohafaza: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "محافظة السكن",
      },
     a_kadaa: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "قضاء السكن",
      }, 
     a_balda: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "البلدة|المدينة",
      },  
     a_hay: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "الحي",
      },  
    
     a_street: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "الشارع",
      },    
    a_buiding: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "البناية",
      },    
    a_floor: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "الطابق",
      },   
    landline: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "هاتف المنزل",
      },         
    mobile: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "هاتف خليوي",
      },  
    work_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "هاتف العمل",
      },      
    fax: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "الفاكس",
      },          
    email: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "البريد الإلكتروني",
      },      
   
    relative_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "اسم القريب",
      },        
    relation: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "صلة القرابه",
      },   
    relative_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "هاتف القريب",
      },              
    },
    {
      sequelize,
      tableName: "resident",
      timestamps: false,
    },
  );
};
