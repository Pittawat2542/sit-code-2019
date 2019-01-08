let fieldsValidators = {
  team_name: {
    identifier: "team_name",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุชื่อทีม"
      }
    ]
  },
  skills: {
    identifier: "team_programming_language",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุภาษาที่ต้องการใช้ในการเขียนโปรแกรม"
      }
    ]
  },
  team_school: {
    identifier: "team_school",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุชื่อโรงเรียน"
      }
    ]
  },
  team_teacher: {
    identifier: "team_teacher",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุชื่อ - สกุล อาจารย์ผู้ควบคุมทีม"
      }
    ]
  },
  team_phone: {
    identifier: "team_phone",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุเบอร์โทรศัพท์อาจารย์ผู้ควบคุมทีม"
      },
      {
        type: "regExp[/^0/]",
        prompt: "กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้องของอาจารย์ผู้ควบคุมทีม"
      }
    ]
  },
  team_address: {
    identifier: "team_address",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุที่อยู่สำหรับจัดส่งเกียรติบัตร"
      }
    ]
  },
  first_name_prefix: {
    identifier: "first_name_prefix",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุคำนำหน้านามของสมาชิกคนที่ 1"
      }
    ]
  },
  first_name: {
    identifier: "first_name",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุชื่อของสมาชิกคนที่ 1"
      }
    ]
  },
  first_surname: {
    identifier: "first_surname",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุนามสกุลของสมาชิกคนที่ 1"
      }
    ]
  },
  first_grade: {
    identifier: "first_grade",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุระดับชั้นของสมาชิกคนที่ 1"
      }
    ]
  },
  first_phone: {
    identifier: "first_phone",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุเบอร์โทรศัพท์ของสมาชิกคนที่ 1"
      },
      {
        type: "regExp[/^0/]",
        prompt: "กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้องของสมาชิกคนที่ 1"
      }
    ]
  },
  first_email: {
    identifier: "first_email",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุอีเมลของสมาชิกคนที่ 1"
      },
      {
        type: "email",
        prompt: "กรุณาระบุอีเมลที่ถูกต้องของสมาชิกคนที่ 1"
      }
    ]
  },
  second_name_prefix: {
    identifier: "second_name_prefix",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุคำนำหน้านามของสมาชิกคนที่ 2"
      }
    ]
  },
  second_name: {
    identifier: "second_name",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุชื่อของสมาชิกคนที่ 2"
      }
    ]
  },
  second_surname: {
    identifier: "second_surname",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุนามสกุลของสมาชิกคนที่ 2"
      }
    ]
  },
  second_grade: {
    identifier: "second_grade",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุระดับชั้นของสมาชิกคนที่ 2"
      }
    ]
  },
  second_phone: {
    identifier: "second_phone",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุเบอร์โทรศัพท์ของสมาชิกคนที่ 2"
      },
      {
        type: "regExp[/^0/]",
        prompt: "กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้องของสมาชิกคนที่ 2"
      }
    ]
  },
  second_email: {
    identifier: "second_email",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุอีเมลของสมาชิกคนที่ 2"
      },
      {
        type: "email",
        prompt: "กรุณาระบุอีเมลที่ถูกต้องของสมาชิกคนที่ 2"
      }
    ]
  },
  third_name_prefix: {
    identifier: "third_name_prefix",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุคำนำหน้านามของสมาชิกคนที่ 3"
      }
    ]
  },
  third_name: {
    identifier: "third_name",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุชื่อของสมาชิกคนที่ 3"
      }
    ]
  },
  third_surname: {
    identifier: "third_surname",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุนามสกุลของสมาชิกคนที่ 3"
      }
    ]
  },
  third_grade: {
    identifier: "third_grade",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุระดับชั้นของสมาชิกคนที่ 3"
      }
    ]
  },
  third_phone: {
    identifier: "third_phone",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุเบอร์โทรศัพท์ของสมาชิกคนที่ 3"
      },
      {
        type: "regExp[/^0/]",
        prompt: "กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้องของสมาชิกคนที่ 3"
      }
    ]
  },
  third_email: {
    identifier: "third_email",
    rules: [
      {
        type: "empty",
        prompt: "กรุณาระบุอีเมลของสมาชิกคนที่ 3"
      },
      {
        type: "email",
        prompt: "กรุณาระบุอีเมลที่ถูกต้องของสมาชิกคนที่ 3"
      }
    ]
  },
  terms: {
    identifier: "terms",
    rules: [
      {
        type: "checked",
        prompt: "กรุณายอมรับเงื่อนไข เพื่อดำเนินการลงทะเบียน"
      }
    ]
  }
};